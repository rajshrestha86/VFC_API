var model_district=require('../models/districts');


module.exports={
    getDistrict: function(req, res){
   
    model_district.find({}, function(err, dists)
{
    if(err)
        throw err;

    res.json(dists);
});
    
    
},
addDistricts: function(req, res){
    var districts=[
        {
            "district_name": "Taplejung",
            "no_of_Hor": 1,
            "no_of_prov":2
        },
        {
            "district_name": "Panchthar",
            "no_of_Hor": 1,
            "no_of_prov":2
        },
        {
            "district_name": "Ilam",
            "no_of_Hor": 2,
            "no_of_prov":4
        },
        {
            "district_name": "Jhapa",
            "no_of_Hor": 5,
            "no_of_prov":10
        },
        {
            "district_name": "Sankhuwasabha",
            "no_of_Hor": 1,
            "no_of_prov":2
        },
        {
            "district_name": "Terhathum",
            "no_of_Hor": 1,
            "no_of_prov":2
        },
        {
            "district_name": "Bhojpur",
            "no_of_Hor": 1,
            "no_of_prov":2
        },
        {
            "district_name": "Dhankuta",
            "no_of_Hor": 1,
            "no_of_prov":2
        },
        {
            "district_name": "Morang",
            "no_of_Hor": 6,
            "no_of_prov":12
        },
        {
            "district_name": "Sunsari",
            "no_of_Hor": 4,
            "no_of_prov":8
        },
        {
            "district_name": "Solukhumbu",
            "no_of_Hor": 1,
            "no_of_prov":2
        },
        {
            "district_name": "Khotang",
            "no_of_Hor": 1,
            "no_of_prov":2
        },
        {
            "district_name": "Okhaldhunga",
            "no_of_Hor": 1,
            "no_of_prov":2
        },
        {
            "district_name": "Udayapaur",
            "no_of_Hor": 2,
            "no_of_prov":4
        },
        {
            "district_name": "Saptari",
            "no_of_Hor": 4,
            "no_of_prov":8
        },
        {
            "district_name": "Siraha",
            "no_of_Hor": 4,
            "no_of_prov":8
        },
        {
            "district_name": "Dolakha",
            "no_of_Hor": 1,
            "no_of_prov":2
        },
        {
            "district_name": "Ramechhap",
            "no_of_Hor": 1,
            "no_of_prov":2
        },
        {
            "district_name": "Sindhuli",
            "no_of_Hor": 2,
            "no_of_prov":4
        },
        {
            "district_name": "Dhanusha",
            "no_of_Hor": 4,
            "no_of_prov":8
        },
        {
            "district_name": "Mahottari",
            "no_of_Hor": 4,
            "no_of_prov":8
        },
        {
            "district_name": "Sarlahi",
            "no_of_Hor": 4,
            "no_of_prov":8
        },
        {
            "district_name": "Rasuwa",
            "no_of_Hor": 1,
            "no_of_prov":2
        },
        {
            "district_name": "Dhading",
            "no_of_Hor": 2,
            "no_of_prov":4
        },
        {
            "district_name": "Nuwakot",
            "no_of_Hor": 2,
            "no_of_prov":4
        },
        {
            "district_name": "Kathmandu",
            "no_of_Hor": 10,
            "no_of_prov":20
        },
        {
            "district_name": "Bhaktapur",
            "no_of_Hor": 2,
            "no_of_prov":4
        },
        {
            "district_name": "Lalitpur",
            "no_of_Hor": 3,
            "no_of_prov":6
        },
        {
            "district_name": "Kabhrepalanchowk",
            "no_of_Hor": 2,
            "no_of_prov":4
        },
        {
            "district_name": "Sindhupalchowk",
            "no_of_Hor": 2,
            "no_of_prov":4
        },
        {
            "district_name": "Makwanpur",
            "no_of_Hor": 2,
            "no_of_prov":4
        },
        {
            "district_name": "Rautahat",
            "no_of_Hor": 4,
            "no_of_prov":8
        },
        {
            "district_name": "Bara",
            "no_of_Hor": 4,
            "no_of_prov":8
        },
        {
            "district_name": "Parsa",
            "no_of_Hor": 4,
            "no_of_prov":8
        },
        {
            "district_name": "Chitawan",
            "no_of_Hor": 3,
            "no_of_prov":6
        },
        {
            "district_name": "Gorkha",
            "no_of_Hor": 2,
            "no_of_prov":4
        },
        {
            "district_name": "Manang",
            "no_of_Hor": 1,
            "no_of_prov":2
        },
        {
            "district_name": "Lamjung",
            "no_of_Hor": 1,
            "no_of_prov":2
        },
        {
            "district_name": "Kaski",
            "no_of_Hor": 3,
            "no_of_prov":6
        },
        {
            "district_name": "Tanahaun",
            "no_of_Hor": 2,
            "no_of_prov":4
        },
        {
            "district_name": "Syangja",
            "no_of_Hor": 2,
            "no_of_prov":4
        },
        {
            "district_name": "Gulmi",
            "no_of_Hor": 2,
            "no_of_prov":4
        },
        {
            "district_name": "Palpa",
            "no_of_Hor": 2,
            "no_of_prov":4
        },
        {
            "district_name": "Arghakhanchi",
            "no_of_Hor": 1,
            "no_of_prov":2
        },
        {
            "district_name": "Nawalparasi (Bardaghat East)",
            "no_of_Hor": 2,
            "no_of_prov":4
        },
        {
            "district_name": "Nawalparasi (Bardaghat West)",
            "no_of_Hor": 2,
            "no_of_prov":4
        },
        {
            "district_name": "Rupandehi",
            "no_of_Hor": 5,
            "no_of_prov":10
        },
        {
            "district_name": "Kapilbastu",
            "no_of_Hor": 3,
            "no_of_prov":6
        },
        {
            "district_name": "Mustang",
            "no_of_Hor": 1,
            "no_of_prov":2
        },
        {
            "district_name": "Myagdi",
            "no_of_Hor": 1,
            "no_of_prov":2
        },
        {
            "district_name": "Baglung",
            "no_of_Hor": 2,
            "no_of_prov":4
        },
        {
            "district_name": "Parbat",
            "no_of_Hor": 1,
            "no_of_prov":2
        },
        {
            "district_name": "Rukum East",
            "no_of_Hor": 1,
            "no_of_prov":2
        },
        {
            "district_name": "Rukum West",
            "no_of_Hor": 1,
            "no_of_prov":2
        },
        {
            "district_name": "Rolpa",
            "no_of_Hor": 1,
            "no_of_prov":2
        },
        {
            "district_name": "Pyuthan",
            "no_of_Hor": 1,
            "no_of_prov":2
        },
        {
            "district_name": "Salyan",
            "no_of_Hor": 1,
            "no_of_prov":2
        },
        {
            "district_name": "Dang",
            "no_of_Hor": 3,
            "no_of_prov":6
        },
        {
            "district_name": "Dolpa",
            "no_of_Hor": 1,
            "no_of_prov":2
        },
        {
            "district_name": "Mugu",
            "no_of_Hor": 1,
            "no_of_prov":2
        },
        {
            "district_name": "Jumla",
            "no_of_Hor": 1,
            "no_of_prov":2
        },
        {
            "district_name": "Kalikot",
            "no_of_Hor": 1,
            "no_of_prov":2
        },
        {
            "district_name": "Humla",
            "no_of_Hor": 1,
            "no_of_prov":2
        },
        {
            "district_name": "Jajarkot",
            "no_of_Hor": 1,
            "no_of_prov":2
        },
        {
            "district_name": "Dailekh",
            "no_of_Hor": 2,
            "no_of_prov":4
        },
        {
            "district_name": "Surket",
            "no_of_Hor": 2,
            "no_of_prov":4
        },
        {
            "district_name": "Banke",
            "no_of_Hor": 3,
            "no_of_prov":6
        },
        {
            "district_name": "Bardiya",
            "no_of_Hor": 2,
            "no_of_prov":4
        },
        {
            "district_name": "Bajura",
            "no_of_Hor": 1,
            "no_of_prov":2
        },
        {
            "district_name": "Achham",
            "no_of_Hor": 2,
            "no_of_prov":4
        },
        {
            "district_name": "Bajhang",
            "no_of_Hor": 1,
            "no_of_prov":2
        },
        {
            "district_name": "Doti",
            "no_of_Hor": 1,
            "no_of_prov":2
        },
        {
            "district_name": "Kailali",
            "no_of_Hor": 5,
            "no_of_prov":10
        },
        {
            "district_name": "Darchula",
            "no_of_Hor": 1,
            "no_of_prov":2
        },
        {
            "district_name": "Baitadi",
            "no_of_Hor": 1,
            "no_of_prov":2
        },
        {
            "district_name": "Dadeldhura",
            "no_of_Hor": 1,
            "no_of_prov":2
        },
        {
            "district_name": "Kanchanpur",
            "no_of_Hor": 3,
            "no_of_prov":6
        }
        
    ]
    model_district.insertMany(districts, function(err, results){
        if(!err)
            {
                console.log('Succress')
                res.json(results)
            }
    })



}
}
