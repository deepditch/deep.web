<?php

use Illuminate\Database\Seeder;

use App\Organization;
use App\RoadDamage;
use App\User;

class AddDefaultOrg extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Organization::find(1)->delete();
        
        $org = Organization::create([
            'name' => "Default Organization"
        ]);

        foreach (RoadDamage::all() as $roaddamage) {
            if ($roaddamage->organization_id === 0) {
                $roaddamage->organization_id = $org->id;
                $roaddamage->save();
            }
        }
        foreach (User::all() as $user) {
            if ($user->organization_id === 0) {
                $user->organization_id = $org->id;
                $user->save();    
            }            
        }
    }
}
