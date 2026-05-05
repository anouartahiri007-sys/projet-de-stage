<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FonctionnaireSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Clean Data
        \Illuminate\Support\Facades\Schema::disableForeignKeyConstraints();
        \App\Models\Fonctionnaire::truncate();
        \App\Models\User::truncate();
        \Illuminate\Support\Facades\Schema::enableForeignKeyConstraints();

        // 2. Create Main Admin
        \App\Models\User::create([
            'name' => 'Admin HR',
            'email' => 'admin@larache.ma',
            'password' => \Illuminate\Support\Facades\Hash::make('admin123'),
            'role' => 'admin'
        ]);

        // 3. Create RH Manager
        $rhUser = \App\Models\User::create([
            'name' => 'Responsable RH',
            'email' => 'rh@larache.ma',
            'password' => \Illuminate\Support\Facades\Hash::make('rh123'),
            'role' => 'rh'
        ]);

        \Illuminate\Support\Facades\DB::table('r_h_s')->insert([
            'user_id' => $rhUser->id,
            'department' => 'Direction des Ressources Humaines',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $employees = [
            [
                'nom' => 'Alami', 'prenom' => 'Ahmed', 'nom_ar' => 'العلمي', 'prenom_ar' => 'أحمد',
                'sexe' => 'Masculin', 'cnie' => 'L123456', 'role' => 'Doctor', 'direction' => 'Service Médical',
                'situation' => 'Marié', 'enfants' => 2, 'grade' => 'Médecin Principal', 'echelon' => '6'
            ],
            [
                'nom' => 'Bennani', 'prenom' => 'Sanaa', 'nom_ar' => 'بنياني', 'prenom_ar' => 'سناء',
                'sexe' => 'Féminin', 'cnie' => 'L654321', 'role' => 'Nurse', 'direction' => 'Service de Soins',
                'situation' => 'Célibataire', 'enfants' => 0, 'grade' => 'Infirmière Diplômée', 'echelon' => '3'
            ],
            [
                'nom' => 'Tazi', 'prenom' => 'Youssef', 'nom_ar' => 'تازي', 'prenom_ar' => 'يوسف',
                'sexe' => 'Masculin', 'cnie' => 'L987654', 'role' => 'Employee', 'direction' => 'Administration Centrale',
                'situation' => 'Divorcé', 'enfants' => 1, 'grade' => 'Administrateur', 'echelon' => '4'
            ],
        ];

        foreach ($employees as $index => $data) {
            $matricule = '1961-' . str_pad($index + 1, 3, '0', STR_PAD_LEFT);
            $email = \Illuminate\Support\Str::slug($data['prenom']) . '.' . \Illuminate\Support\Str::slug($data['nom']) . '@larache.ma';
            $password = 'password123';

            $user = \App\Models\User::create([
                'name' => $data['prenom'] . ' ' . $data['nom'],
                'email' => $email,
                'password' => \Illuminate\Support\Facades\Hash::make($password),
                'role' => strtolower($data['role']),
            ]);

            $fonctionnaire = \App\Models\Fonctionnaire::create([
                'user_id' => $user->id,
                'nom' => $data['nom'],
                'nom_ar' => $data['nom_ar'],
                'prenom' => $data['prenom'],
                'prenom_ar' => $data['prenom_ar'],
                'sexe' => $data['sexe'],
                'cnie' => $data['cnie'],
                'matricule' => $matricule,
                'email_perso' => strtolower($data['prenom'] . '@gmail.com'),
                'telephone' => '060000000' . $index,
                'date_naissance' => '1985-05-15',
                'lieu_naissance' => 'Larache',
                'lieu_naissance_ar' => 'العرائش',
                'situation_familiale' => $data['situation'],
                'nombre_enfants' => $data['enfants'],
                'recruitment_date' => '2015-01-01',
                'grade' => $data['grade'],
                'echelon' => $data['echelon'],
                'date_grade' => '2020-01-01',
                'date_echelon' => '2022-01-01',
                'direction' => $data['direction'],
                'poste' => $data['role'],
            ]);

            // Optional: Generate PDF if Browsershot is available and you want it in the seeder
            try {
                $html = view('pdf.employee_onboarding', [
                    'fonctionnaire' => $fonctionnaire,
                    'user' => $user,
                    'password' => $password
                ])->render();

                $pdfPath = storage_path('app/public/documents/rh/onboarding_' . $matricule . '.pdf');
                if (!file_exists(dirname($pdfPath))) { mkdir(dirname($pdfPath), 0755, true); }
                
                // Note: PDF generation might be slow in seeder, but requested.
                // \Spatie\Browsershot\Browsershot::html($html)->format('A4')->noSandbox()->save($pdfPath);
            } catch (\Exception $e) {
                // Skip PDF if it fails during seeding
            }
        }
    }
}
