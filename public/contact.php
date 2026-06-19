<?php

declare(strict_types=1);

// ─── Bootstrap ────────────────────────────────────────────────────────────────

loadEnv(__DIR__ . '/../.env');

// Enable CORS for dev
if (env('APP_ENV') === 'development') {
    header('Access-Control-Allow-Origin: http://localhost:4321');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}

/**
 * Respond with a JSON payload and exit.
 *
 * @param array<string, mixed> $data
 */
function jsonResponse(int $status, array $data): never
{
    http_response_code($status);
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

// Only accept POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(405, ['error' => 'Method not allowed.']);
}

// ─── Autoloader & dependencies ────────────────────────────────────────────────

require __DIR__ . '/../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception as MailerException;

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Parse a .env file into the current environment.
 * Handles quoted values and ignores comments / blank lines.
 */
function loadEnv(string $path): void
{
    if (!is_file($path)) {
        throw new RuntimeException("Missing .env file at: {$path}");
    }

    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

    foreach ($lines as $line) {
        $line = trim($line);

        if ($line === '' || str_starts_with($line, '#')) {
            continue;
        }

        [$key, $value] = array_map('trim', explode('=', $line, 2)) + [1 => ''];

        // Strip surrounding quotes
        if (preg_match('/^(["\'])(.+)\1$/', $value, $m)) {
            $value = $m[2];
        }

        $_ENV[$key] = $value;
        putenv("{$key}={$value}");
    }
}

function env(string $key): string
{
    $value = $_ENV[$key] ?? getenv($key);

    if ($value === false || $value === '') {
        throw new RuntimeException("Required environment variable '{$key}' is not set.");
    }

    return (string) $value;
}

/**
 * Verify a Cloudflare Turnstile token.
 */
function verifyTurnstile(string $token, string $secret, string $remoteIp): bool
{
    $payload = http_build_query([
        'secret'   => $secret,
        'response' => $token,
        'remoteip' => $remoteIp,
    ]);

    $ctx = stream_context_create([
        'http' => [
            'method'  => 'POST',
            'header'  => "Content-Type: application/x-www-form-urlencoded\r\n",
            'content' => $payload,
            'timeout' => 10,
        ],
    ]);

    $raw = @file_get_contents(
        env('CAPTCHA_URL'),
        false,
        $ctx,
    );

    if ($raw === false) {
        return false;
    }

    $result = json_decode($raw, associative: true);

    return ($result['success'] ?? false) === true;
}

// ─── Input & validation ───────────────────────────────────────────────────────

$name    = trim($_POST['name']    ?? '');
$email   = trim($_POST['email']   ?? '');
$message = trim($_POST['message'] ?? '');
$token   = trim($_POST['token'] ?? '');

$errors = [];

if ($email === '') {
    $errors['email'] = 'required';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'invalid';
}

if ($message === '') {
    $errors['message'] = 'required';
}

if ($token === '') {
    $errors['token'] = 'required';
}

if ($errors !== []) {
    jsonResponse(422, ['errors' => $errors]);
}

// ─── Turnstile verification ───────────────────────────────────────────────────

$remoteIp = $_SERVER['HTTP_CF_CONNECTING_IP']   // Cloudflare proxy
    ?? $_SERVER['HTTP_X_FORWARDED_FOR']
    ?? $_SERVER['REMOTE_ADDR']
    ?? '';

if (!verifyTurnstile($token, env('CAPTCHA_SECRET_KEY'), $remoteIp)) {
    jsonResponse(403, ['errors' => ['token' => 'invalid']]);
}

// ─── Send email ───────────────────────────────────────────────────────────────

$senderName  = htmlspecialchars($name, ENT_QUOTES);
$safeEmail   = htmlspecialchars($email,   ENT_QUOTES);
$safeMessage = htmlspecialchars($message, ENT_QUOTES);

$htmlBody = <<<HTML
    <p><strong>From:</strong> {$senderName} &lt;{$safeEmail}&gt;</p>
    <p><strong>Message:</strong></p>
    <p>{$safeMessage}</p>
    HTML;

$plainBody = "From: {$senderName} <{$email}>\n\nMessage:\n{$message}";

try {
    $mail = new PHPMailer(exceptions: true);

    $mail->isSMTP();
    $mail->Host       = env('SMTP_HOST');
    $mail->Port       = (int) env('SMTP_PORT');
    $mail->SMTPAuth   = true;
    $mail->Username   = env('SMTP_USERNAME');
    $mail->Password   = env('SMTP_PASSWORD');
    $mail->SMTPSecure = match ((int) env('SMTP_PORT')) {
        465     => PHPMailer::ENCRYPTION_SMTPS,
        default => PHPMailer::ENCRYPTION_STARTTLS,
    };

    // Envelope sender — must be an address you own / are authorised to send from
    $mail->setFrom(env('MAIL_FROM_ADDRESS'), env('MAIL_FROM_NAME'));

    // Reply-To lets you respond directly to the visitor
    $mail->addReplyTo($email, $senderName);

    $mail->addAddress(env('MAIL_TO_ADDRESS'));

    $mail->isHTML(true);
    $mail->CharSet = PHPMailer::CHARSET_UTF8;
    $mail->Subject = env('MAIL_SUBJECT');
    $mail->Body    = $htmlBody;
    $mail->AltBody = $plainBody;

    $mail->send();

    jsonResponse(200, []);

} catch (MailerException $e) {
    // Log server-side but don't leak internals to the client
    error_log('[contact.php] Mailer error: ' . $e->getMessage());
    jsonResponse(500, []);
}