<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class DemoUsersSeeder extends Seeder
{
    /**
     * Seed 4 demo accounts for RBAC testing.
     * Roles: doctor, nurse, veterinarian, rh
     */
    public function run(): void
    {
        $users = [
            [
                'name'       => 'Dr. Youssef El Mansouri',
                'email'      => 'y.elmansouri@commune.ma',
                'password'   => Hash::make('Medecin@2024!'),
                'role'       => 'doctor',
                'department' => 'Service Santé',
                'phone'      => '+212 6 12 34 56 78',
            ],
            [
                'name'       => 'Fatima Zahra Idrissi',
                'email'      => 'fz.idrissi@commune.ma',
                'password'   => Hash::make('Nurse@2024!'),
                'role'       => 'nurse',
                'department' => 'Service Santé',
                'phone'      => '+212 6 23 45 67 89',
            ],
            [
                'name'       => 'Dr. Karim Oulad Hadj',
                'email'      => 'k.ouladhadj@commune.ma',
                'password'   => Hash::make('Vet3rinaire@25'),
                'role'       => 'veterinarian',
                'department' => 'Service Vétérinaire',
                'phone'      => '+212 6 34 56 78 90',
            ],
            [
                'name'       => 'Nadia Chraibi',
                'email'      => 'n.chraibi@commune.ma',
                'password'   => Hash::make('RH_Admin#2024'),
                'role'       => 'rh',
                'department' => 'Ressources Humaines',
                'phone'      => '+212 6 45 67 89 01',
            ],
        ];

        foreach ($users as $userData) {
            User::updateOrCreate(
                ['email' => $userData['email']],
                $userData
            );
        }

        $this->command->info('✅ 4 demo users created successfully!');
        $this->command->table(
            ['Name', 'Email', 'Role', 'Password'],
            [
                ['Dr. Youssef El Mansouri', 'y.elmansouri@commune.ma', 'doctor', 'Medecin@2024!'],
                ['Fatima Zahra Idrissi', 'fz.idrissi@commune.ma', 'nurse', 'Nurse@2024!'],
                ['Dr. Karim Oulad Hadj', 'k.ouladhadj@commune.ma', 'veterinarian', 'Vet3rinaire@25'],
                ['Nadia Chraibi', 'n.chraibi@commune.ma', 'rh', 'RH_Admin#2024'],
            ]
        );
    }
}
