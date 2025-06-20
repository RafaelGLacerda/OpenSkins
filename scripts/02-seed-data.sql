-- Insert sample skins
INSERT INTO skins (name, weapon, rarity, image_url, market_value) VALUES
-- Knives (Legendary - 1%)
('Recon Balisong', 'Melee', 'Legendary', '/placeholder.svg?height=100&width=150', 150.00),
('Prime Karambit', 'Melee', 'Legendary', '/placeholder.svg?height=100&width=150', 200.00),
('Glitchpop Dagger', 'Melee', 'Legendary', '/placeholder.svg?height=100&width=150', 180.00),

-- Epic skins (5%)
('Prime Vandal', 'Vandal', 'Epic', '/placeholder.svg?height=100&width=150', 50.00),
('Elderflame Operator', 'Operator', 'Epic', '/placeholder.svg?height=100&width=150', 60.00),
('Ion Phantom', 'Phantom', 'Epic', '/placeholder.svg?height=100&width=150', 45.00),
('Glitchpop Phantom', 'Phantom', 'Epic', '/placeholder.svg?height=100&width=150', 55.00),

-- Rare skins (15%)
('Sovereign Ghost', 'Ghost', 'Rare', '/placeholder.svg?height=100&width=150', 25.00),
('Reaver Vandal', 'Vandal', 'Rare', '/placeholder.svg?height=100&width=150', 30.00),
('Singularity Phantom', 'Phantom', 'Rare', '/placeholder.svg?height=100&width=150', 28.00),
('Oni Phantom', 'Phantom', 'Rare', '/placeholder.svg?height=100&width=150', 32.00),

-- Common skins (79%)
('Avalanche Spectre', 'Spectre', 'Common', '/placeholder.svg?height=100&width=150', 8.00),
('Convex Vandal', 'Vandal', 'Common', '/placeholder.svg?height=100&width=150', 10.00),
('Dot Exe Vandal', 'Vandal', 'Common', '/placeholder.svg?height=100&width=150', 12.00),
('Smite Classic', 'Classic', 'Common', '/placeholder.svg?height=100&width=150', 5.00),
('Surge Spectre', 'Spectre', 'Common', '/placeholder.svg?height=100&width=150', 7.00),
('Tethered Realms Phantom', 'Phantom', 'Common', '/placeholder.svg?height=100&width=150', 9.00);

-- Insert sample cases
INSERT INTO cases (name, description, price, image_url) VALUES
('Caixa Lendária', 'Chance de conseguir facas raras e skins épicas!', 15.00, '/placeholder.svg?height=200&width=200'),
('Caixa Premium', 'Skins de alta qualidade com ótimas chances!', 8.00, '/placeholder.svg?height=200&width=200'),
('Caixa Básica', 'Perfeita para começar sua coleção!', 3.00, '/placeholder.svg?height=200&width=200');

-- Link skins to cases with probabilities
-- Caixa Lendária (ID will be generated, so we need to use a subquery)
INSERT INTO case_skins (case_id, skin_id, probability)
SELECT c.id, s.id, 
  CASE 
    WHEN s.rarity = 'Legendary' THEN 1.00
    WHEN s.rarity = 'Epic' THEN 10.00
    WHEN s.rarity = 'Rare' THEN 25.00
    WHEN s.rarity = 'Common' THEN 64.00
  END
FROM cases c, skins s
WHERE c.name = 'Caixa Lendária';

-- Caixa Premium
INSERT INTO case_skins (case_id, skin_id, probability)
SELECT c.id, s.id, 
  CASE 
    WHEN s.rarity = 'Epic' THEN 5.00
    WHEN s.rarity = 'Rare' THEN 20.00
    WHEN s.rarity = 'Common' THEN 75.00
  END
FROM cases c, skins s
WHERE c.name = 'Caixa Premium' AND s.rarity != 'Legendary';

-- Caixa Básica
INSERT INTO case_skins (case_id, skin_id, probability)
SELECT c.id, s.id, 
  CASE 
    WHEN s.rarity = 'Rare' THEN 15.00
    WHEN s.rarity = 'Common' THEN 85.00
  END
FROM cases c, skins s
WHERE c.name = 'Caixa Básica' AND s.rarity IN ('Rare', 'Common');
