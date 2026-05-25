$files = Get-ChildItem -Path src -Recurse -Filter *.tsx
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $content = $content -replace 'Share2Fill', 'ShareFill'
    $content = $content -replace 'ShieldCheckFill', 'ShieldFillCheck'
    $content = $content -replace 'Wallet2Fill', 'Wallet2'
    $content = $content -replace 'RobotFill', 'Robot'
    $content = $content -replace 'GraphUpArrow', 'GraphUpArrow'
    $content = $content -replace 'RocketTakeoffFill', 'RocketTakeoffFill'
    Set-Content $file.FullName $content
    Write-Host "Corrige: $($file.Name)"
}
Write-Host "Termine !"
