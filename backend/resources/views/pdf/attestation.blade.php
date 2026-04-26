<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Attestation de Travail</title>
    <style>
        body { font-family: 'Helvetica', sans-serif; padding: 40px; color: #111; }
        .header { text-align: center; border-bottom: 2px solid #153A61; padding-bottom: 20px; margin-bottom: 40px; }
        .title { text-align: center; font-size: 24px; font-weight: bold; text-decoration: underline; margin-bottom: 50px; }
        .content { font-size: 16px; line-height: 2; text-align: justify; }
        .signature { margin-top: 80px; text-align: right; font-weight: bold; }
    </style>
</head>
<body>
    <div class="header">
        <h2>ROYAUME DU MAROC</h2>
        <h3>Commune de Larache</h3>
        <p>Direction des Ressources Humaines</p>
    </div>

    <div class="title">ATTESTATION DE TRAVAIL</div>

    <div class="content">
        <p>Le Président du Conseil Communal de Larache soussigné, atteste par la présente que :</p>
        <p><strong>Nom et Prénom :</strong> {{ $name }}</p>
        <p><strong>Matricule :</strong> {{ $matricule }}</p>
        <p><strong>Grade :</strong> {{ $grade }}</p>
        <p>Exerce ses fonctions au sein de la Commune de Larache jusqu'à ce jour.</p>
        <p>En foi de quoi, la présente attestation lui est délivrée pour servir et valoir ce que de droit.</p>
    </div>

    <div class="signature">
        <p>Fait à Larache, le {{ $date }}</p>
        <p>Pour le Président et par délégation</p>
        <br/><br/><br/>
        <p>Cachet et Signature</p>
    </div>
</body>
</html>
