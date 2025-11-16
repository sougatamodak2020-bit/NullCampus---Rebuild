# NullCampus Development Server Startup Script
Write-Host "?? Starting NullCampus Development Server..." -ForegroundColor Cyan

# Navigate to project directory
Set-Location "E:\git\nullcampus-rebuild\NullCampus---Rebuild"

# Check if .env.local exists
if (-not (Test-Path ".env.local")) {
    Write-Host "??  Warning: .env.local not found!" -ForegroundColor Yellow
    Write-Host "Creating .env.local with your Supabase credentials..." -ForegroundColor Yellow
    
    @"
NEXT_PUBLIC_SUPABASE_URL=https://wfmgodccwicvedcdystv.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmbWdvZGNjd2ljdmVkY2R5c3R2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMjA3NjcsImV4cCI6MjA3ODc5Njc2N30.ZkyFJLz-jn9G7GNG3xfw1rRALWAmh2V9-1CKjlFNp0E
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmbWdvZGNjd2ljdmVkY2R5c3R2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzIyMDc2NywiZXhwIjoyMDc4Nzk2NzY3fQ.6Dms7zaWYE1IIuzNe6WCslrl-LO8_On7t7bECZQ-8E4
NEXT_PUBLIC_APP_URL=http://localhost:3000
"@ | Out-File -FilePath ".env.local" -Encoding utf8
}

Write-Host "? Environment configured" -ForegroundColor Green
Write-Host "?? Opening browser to http://localhost:3000" -ForegroundColor Cyan
Write-Host "? Starting server (this may take a few seconds)...`n" -ForegroundColor Yellow

# Start dev server
npm run dev
