# Menu verification report — LÜMA

## 1. Sources inspected

All 17 menu screenshots in `Menu/` (duplicated under `Luma/Menu/` and `ZIP/Menu.zip` — identical files):

| File | Content | Status |
|---|---|---|
| 122013.png | Crêpes panées, tagliatelle Nutella, gaufres | legible, cropped bottom |
| 122018.png | Same page, fuller crop (Big Chock desc. visible) | legible — used to complete 122013 |
| 122024.png | Protein shakes, smoothies, milkshakes, mojitos, jus frais | legible |
| 122030.png | Cafés, chocolat, Turkish coffee, iced coffee, thés, softs | legible |
| 122037.png | Pizzas + fromages (bottom: ricotta, sicilien) | legible |
| 122043.png | Petit-déjeuner (Express → LÜMA Duo) | legible |
| 122051.png | Petit-déjeuner (pain perdu → brunch) | legible |
| 122059.png | Salades, briks, soupes | legible |
| 122110.png | Pâtes + riz | legible |
| 122120.png | Plats (poulet, poisson, fruits de mer) | legible |
| 122129.png | Pancakes + pain perdu New | legible |
| 122138.png | Frappuccino, jwejem, crêpes classiques | legible |
| 122150.png | Sandwiches | legible |
| 122157.png | Desserts | legible (duplicate of 122210) |
| 122210.png | Desserts | legible (duplicate) |
| 122216.png | Ojja + omelettes | legible |
| 122224.png | Lasagnes + viandes | legible |

Unique source pages: 15 (122013/122018 overlap; 122157/122210 duplicates).
Tiny thumbnails in `ZIP/luma3.zip → menu/` (12 × ~5 KB) were inspected: same menu at unreadable resolution — not used as sources.
No other menu documents found in the project (searched `Luma/`, `Menu/`, `ZIP/`, archives).

## 2. Extraction result

- **23 categories, 217 entries**, all with prices in DT, in `assets/js/menu-data.js`.
- Every readable item from every unique source page is included. No dish invented, no price guessed.
- Original French/Italian terms preserved (accents normalised, e.g. `CAFÉ CRÈME` → `Café crème`).

## 3. Corrections vs the previous single-page build

The previous build had real gaps/errors, all fixed here:

1. **Thé infusion: 5 DT → 3 DT** (source 122030 clearly shows 3 dt).
2. **Thé aux pignons: 5 DT → 8 DT** (source shows 8 dt).
3. **Missing dishes added:** Fruits de mer sautés à la sauce blanche (34), Plateau fruits de mer 2 pers. (70), Salade bistrot (17), Brik chevrette (9), Fromage de chèvre (4), Ricotta (2,5), Sicilien (2,5), Mojito Énergétique (12), Jus d’ananas (7), Mixta deux jus (10, previously listed as “Mixte”).
4. **Petit-déjeuner descriptions** completed from sources (Express includes jus; Maison/Matin salé/Continental/British/LÜMA/LÜMA Duo/Complet/Méditerranéen/Brunch full contents transcribed).
5. **Maison (15 DT)** renamed correctly (was “Jus maison”); **Mixta** spelling kept as printed.
6. **Margheritta** kept with double-R as printed on source 122037.

## 4. Uncertain readings (flagged, not guessed)

- **Fromages “BEBLECHON 3,5”** — printed with B; almost certainly Reblochon (font rendering). Transcribed as Reblochon, flagged here.
- **Fromages “CAMEMBERT 3,5”** — printed without second A; transcribed as Camembert, flagged.
- **“F. CHÈVRE 4”** — abbreviation on source; expanded to “Fromage de chèvre”, flagged.
- **“LA PAVLOVA 4”** listed among fromages on the source — kept as printed although it is normally a dessert; flagged for owner confirmation.
- **“SICILIEN 2,5”** — kept as printed (cheese?); flagged for owner confirmation.
- **Café pistache “SERVI AVEC UNE PIÈCE DE …”** — last word partly stylised; transcribed “Servi avec une pièce de pâtisserie — à confirmer”.
- **“LA TIPIQUE / LA TENDANCE”** — kept as printed (source spelling); may intend “Typique / Tendance”.
- **“SPINACINA / PATATINE / HOLLYWOOD”** — kept as printed.
- **“JWEJEM / JWEJEM LUMA”** spellings kept as printed.
- **“BLUE HAWAI / PIÑA variants”** — kept as printed.
- **Mojito Passion Fruits description** partially overlapped in the screenshot; transcribed visible words only.

## 5. Items requiring owner confirmation before public launch

1. All 217 prices against the current till menu (screenshots may be outdated).
2. The 11 flagged readings above.
3. Whether “La Pavlova” and “Sicilien” belong in Fromages.
4. 2-person formulas (Paella 68, Plateau 70, LÜMA Duo 40, Méditerranéen 40, Brunch 45) — confirm servings.
5. Any items since added/removed.

## 6. Completeness check

Implemented menu compared page-by-page against all 15 unique source pages: every legible line appears in `menu-data.js`. Menu screenshots are **not** displayed anywhere on the finished site — the menu is real HTML text with search + category filters (`menu.html`).
