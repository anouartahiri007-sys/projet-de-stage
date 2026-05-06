<!DOCTYPE html>
<html>
<head>
    <title>Mise à jour de vos identifiants e-RH</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
    <div style="max-w: 600px; margin: 0 auto; background: #fff; padding: 20px; border-radius: 8px; border-top: 4px solid #003366;">
        <h2 style="color: #003366;">Mise à jour de vos informations</h2>
        <p>Bonjour {{ $user->name }},</p>
        <p>Suite à une modification de votre dossier administratif, vos identifiants d'accès à la plateforme e-RH ont été mis à jour.</p>
        
        <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px; border: 1px solid #e2e8f0; margin: 20px 0;">
            @if($newEmail)
            <p style="margin: 5px 0;"><strong>Nouvel Email :</strong> {{ $newEmail }}</p>
            @endif
            @if($newPassword)
            <p style="margin: 5px 0;"><strong>Nouveau Mot de passe :</strong> <span style="font-family: monospace; color: #e11d48; font-weight: bold;">{{ $newPassword }}</span></p>
            @endif
        </div>

        <p>Veuillez utiliser ces nouvelles informations pour vous connecter à votre portail.</p>
        <br>
        <p>Cordialement,<br>Département des Ressources Humaines<br>Commune de Larache</p>
    </div>
</body>
</html>
