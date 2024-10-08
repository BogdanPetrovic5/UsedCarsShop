//For easier and faster implementation and testing of filtering by model and brand I've decided to keep all available brands and models on fronend in separate folder and file. But It would be better to keep it in database.
export const carBrandsAndModels = [
    { brand: 'Toyota', models: ['Camry', 'Corolla', 'Prius', 'Highlander', 'RAV4', 'Tacoma', 'Tundra', 'Avalon', 'Sienna', '4Runner'] },
    { brand: 'Honda', models: ['Civic', 'Accord', 'CR-V', 'Pilot', 'Fit', 'HR-V', 'Odyssey', 'Ridgeline', 'Passport', 'Insight'] },
    { brand: 'Ford', models: ['F-150', 'Escape', 'Explorer', 'Mustang', 'Edge', 'Fusion', 'Ranger', 'Expedition', 'Bronco', 'Focus'] },
    {
    brand: 'BMW',
    models: [
        '118', '120', '123', '125', '128', '130', '135', '218', '220', '225', '228',  '318', '320', '323', '325', '328', '330', '335', 'M3',
        '320', '321', '322', '323', '324', '325', '326', '327', '328', '329',
        '420', '428', '430', '435', 'M4',
        '520', '523', '525', '528', '530', '535', '540', 'M5',
        '620', '625', '628', '630', '635', '640', '645', '650', 'M6',
        '725', '728', '730', '735', '740', '745', '750', '760',
        'X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7',
        'i3', 'i8', 'Z3', 'Z4'
    
    ]
    },
    { brand: 'Mercedes', models: ['A-Class', 'C-Class', 'E-Class', 'S-Class', 'GLA', 'GLC', 'GLE', 'GLS', 'G-Class', 'AMG GT'] },
    { brand: 'Audi', models: ['A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'Q3', 'Q5', 'Q7', 'Q8'] },
    { brand: 'Chevrolet', models: ['Silverado', 'Equinox', 'Malibu', 'Traverse', 'Colorado', 'Camaro', 'Tahoe', 'Suburban', 'Blazer', 'Trax'] },
    { brand: 'Nissan', models: ['Altima', 'Sentra', 'Maxima', 'Rogue', 'Murano', 'Pathfinder', 'Armada', 'Frontier', 'Titan', 'Leaf'] },
    { brand: 'Volkswagen', models: ['Golf', 'Jetta', 'Passat', 'Tiguan', 'Atlas', 'Beetle', 'Polo', 'Touareg', 'Arteon', 'ID.4'] },
    { brand: 'Hyundai', models: ['Elantra', 'Sonata', 'Tucson', 'Santa Fe', 'Palisade', 'Kona', 'Venue', 'Ioniq', 'Nexo', 'Veloster'] },
    { brand: 'Kia', models: ['Rio', 'Soul', 'Seltos', 'Sportage', 'Sorento', 'Telluride', 'Stinger', 'Optima', 'Niro', 'Cadenza'] },
    { brand: 'Mazda', models: ['Mazda3', 'Mazda6', 'CX-3', 'CX-5', 'CX-9', 'MX-5 Miata', 'CX-30', 'RX-8', 'Mazda2', 'Mazda5'] },
    { brand: 'Subaru', models: ['Impreza', 'Legacy', 'Outback', 'Forester', 'Ascent', 'WRX', 'Crosstrek', 'BRZ', 'Baja', 'Tribeca'] },
    { brand: 'Tesla', models: ['Model S', 'Model 3', 'Model X', 'Model Y', 'Roadster', 'Cybertruck', 'Semi'] },
    { brand: 'Volvo', models: ['XC90', 'XC60', 'XC40', 'S60', 'S90', 'V60', 'V90', 'C40', 'V40', 'S80'] },
    { brand: 'Jaguar', models: ['XE', 'XF', 'XJ', 'F-Pace', 'E-Pace', 'I-Pace', 'F-Type', 'XK', 'XJR', 'XK8'] },
    { brand: 'Lexus', models: ['IS', 'ES', 'GS', 'LS', 'NX', 'RX', 'GX', 'LX', 'LC', 'RC'] },
    { brand: 'Porsche', models: ['911', 'Cayenne', 'Macan', 'Panamera', 'Taycan', '718 Cayman', '718 Boxster', 'Carrera GT', '918 Spyder', 'Boxster'] },
    { brand: 'Ferrari', models: ['488 GTB', '812 Superfast', 'Portofino', 'Roma', 'F8 Tributo', 'SF90 Stradale', 'GTC4Lusso', 'LaFerrari', 'Enzo', 'F12berlinetta'] },
    { brand: 'Lamborghini', models: ['Huracan', 'Aventador', 'Urus', 'Gallardo', 'Murcielago', 'Diablo', 'Countach', 'Sian', 'Reventon', 'Veneno'] },
    { brand: 'Mitsubishi', models: ['Lancer', 'Outlander', 'Pajero', 'Eclipse', 'ASX', 'Mirage', 'Galant', 'Endeavor', 'Evolution', 'Xpander'] },
    { brand: 'Acura', models: ['ILX', 'TLX', 'RLX', 'MDX', 'RDX', 'NSX', 'ZDX', 'TSX', 'Integra', 'Legend'] },
    { brand: 'Infiniti', models: ['Q50', 'Q60', 'Q70', 'QX50', 'QX60', 'QX80', 'G35', 'G37', 'M37', 'FX50'] },
    { brand: 'Buick', models: ['Enclave', 'Encore', 'Envision', 'LaCrosse', 'Regal', 'Cascada', 'Verano', 'Lucerne', 'Rainier', 'Rendezvous'] },
    { brand: 'Chrysler', models: ['300', 'Pacifica', 'Voyager', 'Aspen', '200', 'Town & Country', 'PT Cruiser', 'Sebring', 'Crossfire', 'Imperial'] },
    { brand: 'Dodge', models: ['Charger', 'Challenger', 'Durango', 'Journey', 'Grand Caravan', 'Avenger', 'Viper', 'Dart', 'Nitro', 'Magnum'] },
    { brand: 'Jeep', models: ['Wrangler', 'Grand Cherokee', 'Cherokee', 'Compass', 'Renegade', 'Gladiator', 'Patriot', 'Liberty', 'Commander', 'Wagoneer'] },
    { brand: 'Land Rover', models: ['Range Rover', 'Discovery', 'Defender', 'Freelander', 'Evoque', 'Velar', 'Sport', 'LR2', 'LR3', 'LR4'] },
    { brand: 'Mini', models: ['Cooper', 'Countryman', 'Clubman', 'Paceman', 'Cabrio', 'Coupe', 'Roadster', 'Traveller', 'Moke', 'Aceman'] },
    { brand: 'Peugeot', models: ['208', '308', '508', '3008', '5008', '2008', '4008', 'RCZ', 'Rifter', 'Traveller'] }
]