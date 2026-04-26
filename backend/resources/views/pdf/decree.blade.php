<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: 'DejaVu Sans', sans-serif; padding: 40px; }
        .header { text-align: center; margin-bottom: 50px; }
        .ministry { font-weight: bold; font-size: 18px; }
        .title { text-align: center; font-size: 24px; font-weight: bold; margin-bottom: 30px; border-bottom: 2px solid #000; padding-bottom: 10px; }
        .content { line-height: 1.6; }
        .footer { margin-top: 100px; text-align: right; }
        .stamp { font-style: italic; border: 1px solid #000; padding: 10px; display: inline-block; }
    </style>
</head>
<body>
    <div class="header">
        <div class="ministry">PUBLIC HEALTH ADMINISTRATION</div>
        <div>REGIONAL DIRECTORATE OF HEALTH</div>
    </div>

    <div class="title">ADMINISTRATIVE DECREE</div>

    <div class="content">
        <p>In accordance with the public service regulations and based on the results of the recent administrative review,</p>
        
        <p><strong>Article 1:</strong> The following personnel change is hereby approved:</p>
        
        <ul>
            <li><strong>Employee:</strong> {{ $employee_name }}</li>
            <li><strong>Professional ID:</strong> {{ $professional_id }}</li>
            <li><strong>Type of Action:</strong> {{ $action_type }}</li>
            <li><strong>Effective Date:</strong> {{ $effective_date }}</li>
        </ul>

        <p><strong>Article 2:</strong> This decision shall be recorded in the personnel files and communicated to the relevant departments for effective implementation.</p>
    </div>

    <div class="footer">
        <p>Done at {{ $location }}, on {{ $today }}</p>
        <br><br>
        <div class="stamp">
            SIGNED: THE REGIONAL DIRECTOR<br>
            (Electronic Signature Ready)
        </div>
    </div>
</body>
</html>
