# Adatkezelés írásbeli záróvizsga jegyzet

Forrás: `Adatkez.pdf`, kizárólag a megadott releváns oldalak alapján.

## ER-modellezés

Releváns oldalak: 39-47.

### Adatmodell és modellezés

Adatbázis létrehozásakor a cél a valós vagy egy kitalált világ egy részének tárolása úgy, hogy abból információkat tudjunk kinyerni. A teljes valóságot nem tároljuk, hanem csak a vizsgálat szempontjából lényeges tulajdonságokat és kapcsolatokat. Ezért az adatbázis mindig modell: egyszerűsített kép egy adott problémakörről.

Az adatmodell hagyományosan két részből áll:

- formalizált jelölésrendszer az adatok és adatkapcsolatok leírására,
- műveletek az adatokon.

Az ER-modell, vagyis egyed-kapcsolat modell nem teljes adatmodell ebben az értelemben, mert nincs benne adatművelet definiálva. Erőssége az, hogy szemléletesen támogatja a fogalmi/logikai modellezést.

### Az ER-modell alapfogalmai

Az ER-modell elemei:

- egyedtípusok,
- attribútumtípusok,
- kapcsolattípusok.

A modellezés típusszinten történik, nem konkrét példányok szintjén. Például az `EMBER` egy egyedtípus, egy konkrét személy pedig ennek egy példánya. Hasonlóan, a `DOLGOZIK` lehet kapcsolattípus, egy adott ember és adott cég közötti dolgozási viszony pedig kapcsolati példány.

Entitás vagy egyed: a valós világban létező, logikai vagy fizikai szempontból saját léttel rendelkező dolog, amelyről adatokat tárolunk. Fontos, hogy az entitáspéldányok megkülönböztethetők legyenek. Hogy valamit entitásnak tekintünk-e, modellezési döntés. Ugyanaz a dolog egyik rendszerben lehet lényegtelen, másikban önállóan azonosítandó entitás.

Tulajdonság vagy attribútum: az entitásokat jellemző adat, amelyen keresztül azok leírhatók és megkülönböztethetők. Egyedhalmaz: azonos attribútumtípusokkal jellemzett egyedek összessége. Jelölése például:

```text
EMBER(név, szül_dátum, anyja_neve, személyi_szám)
SZERZŐDÉS(cég1, cég2, dátum, hely, érték)
```

### Kapcsolatok

Kapcsolat: entitások névvel ellátott viszonya. Formálisan egy kapcsolattípus entitástípusok névvel ellátott sorozata. Példák:

```text
DOLGOZIK: EMBER, CÉG
ALÁÍR: EMBER, CÉG, SZERZŐDÉS
TESTVÉRE: EMBER, EMBER
```

A kapcsolat fokszáma azt fejezi ki, hány entitáshalmaz vesz részt benne. A bináris kapcsolat két entitáshalmaz között áll fenn, a ternáris három között.

A kapcsolat funkcionalitása vagy kardinalitása azt fejezi ki, hogy az egyik oldali példányhoz a másik oldalon hány példány tartozhat. Alapvető típusok:

- egy-egy kapcsolat: mindkét irányban legfeljebb egy példány kapcsolódhat;
- több-egy kapcsolat: az első oldali példányhoz legfeljebb egy második oldali példány tartozik, de a második oldali példányhoz több első oldali példány is tartozhat;
- több-több kapcsolat: mindkét irányban tetszőleges számú példány kapcsolódhat.

Példák:

- `HÁZASSÁG: EMBER, EMBER` tipikusan 1:1, ha az adott modellben egy embernek egy időben legfeljebb egy házastársa lehet.
- `TANUL: DIÁK, OSZTÁLY` tipikusan N:1, ha egy diák egy osztályba jár, de egy osztályba sok diák járhat.
- `TAN: DIÁK, TANÁR` tipikusan N:M, ha egy tanár több diákot taníthat és egy diák több tanárnál tanulhat.

A kardinalitás is modellezési kérdés. Nem univerzális igazság, hanem az adott valóságdarab és követelményrendszer alapján választott megszorítás.

### Kulcs az ER-modellben

Kulcs: attribútumok olyan halmaza, amely az entitáspéldányokat egyértelműen azonosítja. Egy egyedhalmaznak legalább egy kulcsa mindig van, mert az entitásoknak megkülönböztethetőknek kell lenniük. Legrosszabb esetben az összes attribútum együtt kulcs.

Egy egyedhalmaznak több kulcsa is lehet. Például az `EMBER` esetén kulcs lehet a `személyi_szám`, de modellezéstől függően a `(név, szül_dátum, anyja_neve)` attribútumhármas is azonosíthat.

ER-diagramon a kulcsattribútumokat aláhúzással jelölik.

### ER-diagram jelölések és speciális elemek

Az ER-diagram grafikus jelölésrendszer az ER-modell szemléltetésére. Az entitáshalmazokat, attribútumokat és kapcsolatokat külön grafikus elemek jelölik. Kapcsolatnak is lehet attribútuma, ha az adat nem önmagában az egyik entitáshoz, hanem a kapcsolat tényéhez tartozik. A PDF példája szerint a `DOLGOZIK` kapcsolat `dátum` attribútuma azt fejezheti ki, hogy egy alkalmazott mely évben mely kirendeltségnél dolgozott.

ISA kapcsolat: specializációt fejez ki. Egy speciálisabb entitáshalmaz rendelkezik az általánosabb entitáshalmaz attribútumaival, és ezeken kívül saját attribútumai is vannak. Például a `PILÓTA` lehet a `SZEMÉLYZET` speciális esete.

Gyenge egyedhalmaz: olyan entitáshalmaz, amelynek önmagában nincs saját kulcsa, az azonosításához egy kapcsolódó tulajdonos egyedhalmazra is szükség van. A tulajdonos egyedhalmaz és a gyenge egyedhalmaz között determináló kapcsolat áll fenn. A gyenge egyed példányai a tulajdonos kulcsával együtt különböztethetők meg.

## ER-relációs leképezés

Releváns oldalak: 122-125.

### Logikai tervezés célja

A relációs adatbázis logikai tervezésének célja az adatbázis logikai szerkezetének meghatározása: milyen relációs sémák legyenek, azok milyen attribútumokat tartalmazzanak, és milyen adattípusok, kulcsok, idegen kulcsok és egyéb megszorítások tartozzanak hozzájuk. A fizikai tervezés, például indexek és tárolási paraméterek kialakítása, ezt követő lépés.

Az ER-diagram alkalmas a valóság fogalmi modellezésére, a relációs adatmodell viszont táblákban/relációkban gondolkodik. Ezért szükséges az ER-diagram relációs sémákká alakítása.

### Egyedhalmaz leképezése

Egy egyedhalmazból olyan relációs séma készül, amely tartalmazza az egyedhalmaz összes attribútumát:

```text
E(A1, A2, ..., Ak)
```

A reláció minden sora az egyedhalmaz egy példányát azonosítja. Az ER-modellben jelölt kulcs a relációs sémában is kulcsként jelenik meg.

ISA kapcsolat esetén, ha egy specializált entitáshalmaz attribútumait egy általánosabb entitáshalmaz határozza meg, akkor a specializált entitáshalmazhoz rendelt relációs sémába az általánosabb entitáshalmaz attribútumait is fel kell venni a PDF által ismertetett módszer szerint.

### Kapcsolattípus leképezése általános módszerrel

Kapcsolattípusból olyan relációs séma készül, amelynek attribútumai között szerepel a kapcsolatban részt vevő összes entitáshalmaz kulcsa. Ha a kapcsolatnak saját attribútuma is van, az is bekerül a kapcsolatból képzett relációba.

Általános alak:

```text
R(E1_kulcsa, E2_kulcsa, ..., kapcsolat_attribútumai)
```

Az így kapott reláció egy sora azt fejezi ki, hogy a benne szereplő kulcsokkal azonosított entitáspéldányok egymással kapcsolatban állnak. Ha két résztvevő entitáshalmaz kulcsattribútumai azonos nevűek lennének, átnevezéssel kell elkerülni a névütközést.

Példa a PDF alapján:

```text
KIRENDELTSÉG(KKÓD, HELY)
ALKALMAZOTT(AKÓD, NÉV, BEOSZTÁS, FIZETÉS)
DOLGOZIK(KKÓD, AKÓD, DÁTUM)
```

Itt a `DOLGOZIK` reláció a kapcsolatot reprezentálja, és tartalmazza a részt vevő entitások kulcsait, valamint a kapcsolat saját `DÁTUM` attribútumát.

### Több-egy kapcsolat hatékonyabb leképezése

Több-egy kapcsolatnál az általános módszer helyett gyakran kevesebb relációval is megőrizhető a kapcsolat. Ha például `DOLGOZIK: EMBER, OSZTÁLY` N:1 jellegű, akkor az `OSZT_ID` idegen kulcsként bekerülhet az `EMBER` relációba:

```text
OSZTÁLY(OSZT_ID, OSZT_NÉV, ÉPÜLET, EMELET)
EMBER(SZEM_SZÁM, NÉV, ANYJA_NEVE, SZÜL_DÁTUM, OSZT_ID)
```

Ilyenkor az `OSZT_ID` az `EMBER` sémában idegen kulcs. Az idegen kulcs olyan attribútum, amely egy másik relációban kulcsattribútum. Ha a kapcsolat opcionális, az idegen kulcs értéke lehet `NULL`; például ha egy ember nem dolgozik egyik osztályon sem.

Ennek előnye, hogy kevesebb reláció szükséges, és az eredeti kapcsolat visszanyeréséhez kevesebb természetes illesztés kell. Emellett a kapcsolat függvényszerűsége, vagyis az N:1 jelleg, részben beépül a relációs struktúrába.

### Információvesztés és redundancia

Az ER-diagram relációs sémákká alakításakor elveszik az egyedek és kapcsolatok formális megkülönböztetése: relációs szinten mindkettő tábla/séma lesz. Ezért a kulcsok, idegen kulcsok és egyéb kényszerek fontosak ahhoz, hogy a sémák eredetére és jelentésére következtetni lehessen.

A 125. oldal bevezeti a sémadekompozíció gondolatát is. Elvileg minden adat betehető lenne egyetlen univerzális sémába, de ez sok felesleges ismétlődést és következetlenséget okozhat. Redundáns a reláció, ha valamely attribútum értéke más attribútumok értékéből ismert szabály alapján kikövetkeztethető. A logikai tervezés egyik célja az ilyen felesleges redundancia kezelése.

## Relációs adatmodell alapjai

Releváns oldalak: 48-50.

### Reláció, domén, n-es

A relációs adatmodell mögött a halmazelméleti relációk elmélete áll.

Reláció: halmazok Descartes-szorzatának részhalmaza. Ha adottak a `D1, D2, ..., Dn` tartományok, akkor a `D1 x D2 x ... x Dn` Descartes-szorzat elemei n-esek, más néven tuple-ök, rekordok vagy ennesek. Egy reláció ezeknek az n-eseknek tetszőleges részhalmaza.

A tartomány vagy domén azt mondja meg, hogy egy attribútum milyen értékkészletből vehet fel értékeket. Például egy életkor numerikus tartományból, egy név szöveges tartományból származhat.

### Táblázatos ábrázolás

A relációt táblázatként szokás ábrázolni:

- az oszlopok az attribútumok,
- a sorok a reláció elemei, vagyis az n-esek,
- az attribútumokhoz domének tartoznak,
- a fejlécben az attribútumnevek szerepelnek.

Az adat értelmezését nem önmagában az érték adja, hanem az attribútumnév, a reláció neve és a dokumentált szemantika. Ezért fontos, hogy világos legyen, mit jelent egy attribútum és mit jelent az, hogy bizonyos értékek egy sorban szerepelnek.

### Relációs séma és adatbázisséma

Relációs séma: annak leírása, hogy egy reláció milyen attribútumokból áll. Jelölése:

```text
R(A1, A2, ..., Ak)
```

Ha egy `r` reláció sémája `R`, akkor jelölhető így:

```text
r(R)
```

Adatbázisséma: egy adatbázisban található relációs sémák összessége.

A jegyzet jelölési konvenciója szerint a relációt és elemeit kisbetűvel, a relációs sémát nagybetűvel jelöljük. Például `r(R)` esetén `r` maga a konkrét reláció, `R` pedig a séma.

### Fokszám és számosság

A reláció foka vagy aritása: a relációban lévő oszlopok, azaz attribútumok száma.

A reláció számossága: a relációban lévő sorok száma.

Vizsgafeladatoknál fontos megkülönböztetés:

- ha projekció után azt kérdezik, hány attribútumból áll a séma, az a kiválasztott attribútumok számától függ;
- ha azt kérdezik, hány elemű a reláció, az a sorok számát jelenti, és projekció után csökkenhet, mert azonos sorok összeolvadhatnak.

### A relációs modell alapkövetkezményei

A reláció halmaz, ezért:

- nem tartalmazhat két azonos sort;
- a sorok sorrendje nem számít;
- az oszlopoknak egyértelmű nevük van;
- az oszlopok sorrendje nem számít, ha név szerint hivatkozunk rájuk.

A tárgyban az attribútumok sorrendjének nincs jelentősége: a relációs sémát lényegében attribútumhalmazként kezeljük.

## Relációalgebra műveletek

Releváns oldalak: 50-56.

### Relációalgebra szerepe

A relációs adatmodell a relációkon értelmezett műveletekkel válik teljessé. A relációalgebra műveletei relációkból relációkat állítanak elő, tehát zártak a relációk halmazára. Ez azt jelenti, hogy egy művelet eredménye újra felhasználható egy következő relációalgebrai művelet operandusaként.

Alapműveletek:

- unió,
- különbség,
- Descartes-szorzat,
- projekció,
- szelekció.

Származtatott műveletek:

- metszet,
- természetes illesztés,
- theta-illesztés,
- hányados.

### Unió

Az unió két reláció egyesítése. Feltétele, hogy az operandusrelációk sémái ugyanannyi attribútumból álljanak. Nem szükséges, hogy a megfelelő attribútumok ténylegesen ugyanazt jelentsék, de ha nincs szemantikai összhang, az eredmény nehezen értelmezhető.

Ha `r` és `s` uniókompatibilisek, akkor `r ∪ s` minden olyan sort tartalmaz, amely `r`-ben vagy `s`-ben szerepel. Mivel a reláció halmaz, az azonos sorok csak egyszer jelennek meg.

Vizsgaszempont: ha `r` 2 elemű és `s` 10 elemű, akkor `r ∪ s` elemszáma legfeljebb 12, mert lehet átfedés. Legalább annyi, amennyi az egyik relációból biztosan nem fedhető le a másikkal, de egyszerű feleletválasztós kérdésben a felső korlát gyakran a lényeg.

### Különbség és metszet

A különbség `r \ s` azokat a sorokat tartalmazza, amelyek `r`-ben benne vannak, de `s`-ben nincsenek. Ugyanazok a kompatibilitási feltételek érvényesek, mint az uniónál: azonos attribútumszám szükséges.

A metszet nem alapműveletként is bevezethető, mert kifejezhető különbséggel:

```text
A ∩ B = A \ (A \ B)
```

### Descartes-szorzat

Az `r x s` Descartes-szorzat minden `r`-beli sort minden `s`-beli sorral összepárosít. Ha `r` foka `n1`, `s` foka `n2`, akkor az eredmény foka `n1 + n2`. Ha `r` elemszáma `m`, `s` elemszáma `k`, akkor az eredmény elemszáma `m * k`, feltéve, hogy a sémakezelés és névütközések rendezettek.

Névütközés esetén minősített attribútumnevekkel vagy átnevezéssel kell különbséget tenni, például `R.A` és `S.A`.

### Projekció

A projekció egy relációból kiválaszt bizonyos attribútumokat, a többit elhagyja. Jelölése:

```text
π_A1,A2,...(r)
```

Az eredmény sémája csak a megadott attribútumokat tartalmazza, ezért a foka pontosan a projekcióban felsorolt attribútumok száma. Ha például egy 5 attribútumú relációt a kulcsára projektálunk, akkor az eredmény sémájának attribútumszáma a kulcs attribútumainak száma, nem automatikusan 5.

Fontos: a projekció során azonos sorok keletkezhetnek, ezeket a relációs algebra halmazszemlélete miatt meg kell szüntetni. Ezért a projekció eredményének elemszáma legfeljebb akkora, mint az eredeti reláció elemszáma. Ha a projekció tartalmaz kulcsot, akkor nem olvadnak össze különböző eredeti sorok, mert a kulcs azonosítja őket. Ha olyan attribútumhalmazra projektálunk, amely nem tartalmaz kulcsot, az eredmény elemszáma lehet ugyanannyi vagy kevesebb az eredetinél.

### Szelekció

A szelekció sorokat válogat ki egy relációból logikai feltétel alapján. Jelölése:

```text
σ_F(r)
```

Az `F` szelekciós feltétel minden sorra kiértékelődik, és csak azok a sorok kerülnek az eredménybe, amelyekre igaz. A feltétel tartalmazhat konstansokat, attribútumneveket, összehasonlító operátorokat és logikai operátorokat.

Példa:

```text
σ_KOR<23 ∧ NÉV='Kovács'(névsor)
```

A szelekció nem változtatja meg a sémát, csak az elemszámot csökkentheti.

### Természetes illesztés

A természetes illesztés két reláció közös nevű attribútumai alapján kapcsol össze sorokat. Azokat a rekordpárokat választja ki, amelyeknél az azonos nevű attribútumok értékei megegyeznek. Az eredményben a közös attribútumok csak egyszer szerepelnek.

Ha nincs közös nevű attribútum, a természetes illesztés Descartes-szorzattá válik.

Alapműveletekkel kifejezve: először Descartes-szorzat, majd szelekció az azonos attribútumértékekre, végül projekció, hogy a duplikált közös attribútum csak egyszer szerepeljen.

### Theta-illesztés

A theta-illesztés általánosabb illesztés. Két reláció Descartes-szorzatából olyan sorpárokat választ ki, amelyek teljesítenek egy megadott feltételt:

```text
r ⋈_θ s = σ_θ(r x s)
```

A feltétel nemcsak egyenlőség lehet, hanem például `<`, `>`, `BETWEEN` jellegű összehasonlítás is.

### Hányados

A hányados olyan relációt ad, amelynek `s`-sel vett Descartes-szorzata a lehető legbővebb részhalmaza `r`-nek. Intuitívan a "minden" típusú kérdésekhez használható. Például a PDF példájában: mely napokon adtak el mindenféle áruból.

Általános gondolat: ha `r` tartalmazza, hogy mely `x` értékek mely `y` értékekhez kapcsolódnak, és `s` tartalmazza az összes elvárt `y` értéket, akkor `r ÷ s` azokat az `x` értékeket adja vissza, amelyek minden `s`-beli `y`-hoz kapcsolódnak.

## SQL tankönyvi alapok

Releváns oldalak: 68-85.

### SQL szerepe és részei

Az SQL a relációs adatbázis-kezelőkkel való kommunikáció legelterjedtebb nyelve. Szabványosított, de a konkrét rendszerekben nyelvjárások vannak.

Fő résznyelvek:

- DDL: adatdefiníciós nyelv, például táblák, nézetek, indexek létrehozása;
- DML: adatmanipulációs nyelv, például beszúrás, törlés, módosítás;
- DQL: lekérdező nyelv, ha külön választják a DML-től;
- DCL: adatelérést vezérlő nyelv, például jogosultságok.

Az SQL nem-procedurális, különösen lekérdezéseknél: azt írjuk le, milyen eredményt akarunk, nem azt, milyen algoritmussal kell előállítani.

Az SQL-ben a kulcsszavak kis- és nagybetűi általában nem különböznek, de a szövegliteráloknál a kis- és nagybetű számíthat. Az utasítások több sorba írhatók, és a példákban pontosvessző zárja őket.

### CREATE TABLE, adattípusok, NULL

Tábla létrehozása:

```sql
CREATE TABLE <táblanév>
(<oszlopnév> <típus> [NOT NULL],
 <oszlopnév> <típus> [NOT NULL],
 ...);
```

Tipikus adattípusok a PDF alapján:

- `CHAR(n)`, `VARCHAR2(n)`: szöveg;
- `NUMBER(w)`: egész szám adott szélességgel;
- `NUMBER(w,d)`: szám adott szélességgel és tizedes pontossággal;
- `DATE`: dátum és tipikusan időpont.

A `NOT NULL` azt jelenti, hogy az adott oszlopban mindig kell megengedett, nem üres értéknek szerepelnie. Ha egy `NOT NULL` oszlopba `NULL` kerülne, a végrehajtás hibával leáll.

### Nézetek és indexek

Nézet:

```sql
CREATE VIEW <nézetnév> [(<oszlopnév1>, ...)]
AS <lekérdezés>;
```

A nézet virtuális tábla. Fizikai táblákból képzett logikai nézetet ad, és használható az adatok más modelljének megjelenítésére vagy bizonyos információk elrejtésére.

Index:

```sql
CREATE [UNIQUE] INDEX <indexnév>
ON <táblanév> (<oszlopnév1>, ...);
```

Az index keresést gyorsíthat. `UNIQUE` index esetén a rendszer biztosítja az adott oszlop vagy oszlopkombináció egyediségét. Az indexek a lekérdezésekben nem jelennek meg, az adatbázis-kezelő használja őket.

Objektum törlése:

```sql
DROP TABLE <név>;
DROP VIEW <név>;
DROP INDEX <név>;
```

### INSERT, DELETE, UPDATE

Beszúrás:

```sql
INSERT INTO <táblanév> [(<oszlopnév>, ...)]
VALUES (<kif1>, <kif2>, ...);
```

Ha nem adunk oszloplistát, akkor a tábla deklarációs sorrendjében minden mezőnek értéket kell adni. Ha adunk oszloplistát, akkor csak ezek kapnak értéket, a többi `NULL` lesz, ha megengedett.

Lekérdezés eredményének beszúrása:

```sql
INSERT INTO <táblanév> [(<oszlopnév>, ...)]
SELECT ...;
```

Törlés:

```sql
DELETE
FROM <táblanév>
[WHERE <logikai kifejezés>];
```

Ha a `WHERE` hiányzik, a tábla minden sora törlődik.

Módosítás:

```sql
UPDATE <táblanév>
SET <oszlopnév> = <kifejezés>, ...
[WHERE <logikai kifejezés>];
```

Ha a `WHERE` hiányzik, minden sor módosul.

### SELECT alapstruktúra

Általános alak:

```sql
SELECT <jellemzők>
FROM <táblák>
[WHERE <logikai kifejezés>]
[<csoportosítás>]
[<rendezés>];
```

Jelentés:

- `SELECT`: az eredménytábla oszlopait definiálja;
- `FROM`: a bemeneti táblákat adja meg;
- `WHERE`: sorokat szűr;
- `GROUP BY` és `HAVING`: csoportosít és csoportokat szűr;
- `ORDER BY`: az eredmény sorainak sorrendjét adja meg.

Minden oszlop kiválasztása:

```sql
SELECT *
FROM emp;
```

Konkrét oszlopok:

```sql
SELECT ename, sal
FROM emp;
```

Számított érték:

```sql
SELECT ename, 12 * sal
FROM emp;
```

SQL-ben a `SELECT` alapértelmezetten nem szünteti meg a duplikált sorokat. Ha relációalgebrai projekcióhoz hasonló duplikátummentesség kell:

```sql
SELECT DISTINCT job
FROM emp;
```

### WHERE és logikai kifejezések

A `WHERE` a sorok közül választ:

```sql
SELECT ename, sal
FROM emp
WHERE sal > 2000;
```

Használható elemek:

- relációs operátorok: `<`, `<=`, `=`, `!=`, `>=`, `>`;
- `BETWEEN ... AND ...`;
- `IS NULL`, `IS NOT NULL`;
- `IN (...)`;
- `LIKE`, ahol `%` tetszőleges karaktersorozat, `_` egy tetszőleges karakter;
- `AND`, `OR`, `NOT`.

`NULL` vizsgálatához nem `= NULL`, hanem `IS NULL` kell.

Dátumliterálként a PDF szerint használható:

```sql
DATE '1982-01-01'
```

### Aggregáció, csoportosítás, rendezés

Oszlopfüggvények:

- `AVG()`: átlag;
- `SUM()`: összeg;
- `COUNT()`: darabszám;
- `MAX()`: maximum;
- `MIN()`: minimum.

`COUNT(*)` minden sort számol. Az oszlopfüggvények a `NULL` értékeket általában kihagyják, kivétel a `COUNT(*)`, amely minden sort számol.

Ha aggregátum mellett nem aggregált oszlop is szerepel a `SELECT` listában, akkor csoportosítani kell:

```sql
SELECT job, AVG(sal)
FROM emp
GROUP BY job;
```

Csoportok szűrésére `HAVING` kell:

```sql
SELECT job, AVG(sal)
FROM emp
GROUP BY job
HAVING AVG(sal) BETWEEN 1000 AND 3000;
```

A `WHERE` a csoportosítás előtt sorokat szűr, a `HAVING` a csoportosítás után csoportokat.

Rendezés:

```sql
SELECT *
FROM emp
WHERE deptno = 30
ORDER BY job, sal DESC;
```

Az `ORDER BY` több oszlopot is kaphat. Az alapértelmezés `ASC`, a `DESC` csökkenő rendezést jelent.

### Halmazműveletek, jogosultság, tranzakció

Lekérdezések eredménytábláin használható halmazműveletek:

- `UNION`,
- `INTERSECT`,
- `MINUS`.

Jogosultságadás és megvonás:

```sql
GRANT <jogosultság>
ON <tábla vagy nézetnév>
TO <felhasználó>;

REVOKE <jogosultság>
ON <tábla vagy nézetnév>
FROM <felhasználó>;
```

Tranzakció: adatbázis-módosítások olyan sorozata, amelyet vagy teljes egészében kell végrehajtani, vagy egyetlen lépését sem. `COMMIT` véglegesít, `ROLLBACK` visszavon az előző `COMMIT` utáni állapotig.

Kényszerek: a táblákra szigorúbb feltételek adhatók meg, például értékkészlet, elsődleges kulcs, idegen kulcs. Az idegen kulcs értéke egy másik tábla elsődleges kulcsának vagy `UNIQUE` oszlopának létező értékével kell egyezzen.

## SQL diasor: SELECT, FROM, WHERE, ORDER BY

Releváns oldalak: 311-356.

### SELECT alapok

A `SELECT` utasítás a lekérdezés központi eleme. A diasor hangsúlya szerint a SELECT alapjait fejből kell tudni.

Alapszintaxis:

```sql
SELECT *|{[DISTINCT] column|expression [alias], ...}
FROM table
[WHERE condition(s)]
[ORDER BY column];
```

Minden oszlop:

```sql
SELECT *
FROM divisions;
```

Adott oszlopok:

```sql
SELECT division_id, division_name, city
FROM divisions;
```

Az SQL utasítások nem kis- és nagybetűérzékenyek kulcsszavak szintjén, több sorba írhatók, a kulcsszavak nem rövidíthetők, és a tagolás csak olvashatósági szerepű.

### Kifejezések és operátori precedencia

A `SELECT` listában nemcsak oszlopnevek, hanem kifejezések is szerepelhetnek:

```sql
SELECT worker_id, last_name, salary, 12 * salary + 100
FROM workers;
```

Az aritmetikai operátorok:

- `*` szorzás,
- `/` osztás,
- `-` kivonás,
- `+` összeadás.

A precedencia miatt zárójelekkel kell egyértelműsíteni, ha más kiértékelési sorrendet akarunk:

```sql
SELECT worker_id, last_name, salary, 12 * (salary + 100)
FROM workers;
```

### NULL érték

A `NULL` azt jelenti, hogy az érték nem elérhető, nincs hozzárendelve, ismeretlen vagy nem alkalmazható. Nem azonos a nullával és nem azonos az üres szöveggel.

Aritmetikai kifejezésben a `NULL`-t tartalmazó eredmény is `NULL` lesz. Ezért használható például az `NVL`:

```sql
SELECT last_name, salary, commission,
       12 * salary * (1 + NVL(commission, 0))
FROM workers;
```

### Aliasok és literálok

Oszlop alias:

- átnevezi az eredményoszlop fejlécét;
- hasznos számított kifejezéseknél;
- közvetlenül az oszlop vagy kifejezés után állhat;
- opcionálisan használható az `AS`;
- dupla idézőjel kell, ha szóköz, speciális karakter vagy kis- és nagybetűérzékeny alias van.

Példa:

```sql
SELECT last_name "Name",
       12 * salary * (1 + commission) "Annual salary"
FROM workers;
```

Karakter- és dátumliterálokat egyszeres idézőjelbe kell tenni. Szövegösszefűzésre a diasor példái az `||` operátort használják:

```sql
SELECT first_name || ' ' || last_name || ' is a ' || position_id
       AS "Worker Details"
FROM workers;
```

### Duplikált sorok

SQL-ben a lekérdezések alapértelmezetten minden sort megjelenítenek, a duplikáltakat is. Egyedi értékekhez:

```sql
SELECT DISTINCT division_id
FROM workers;
```

Ez fontos különbség a relációalgebrai projekcióhoz képest, ahol az ismétlődések megszűnnek.

### WHERE: sorok szűrése

A `WHERE` a `FROM` után áll, és a visszaadott sorokat korlátozza:

```sql
SELECT worker_id, last_name, position_id, division_id
FROM workers
WHERE division_id = 90;
```

Szövegértékeket és dátumokat egyszeres idézőjelbe kell tenni. A karakterértékek kis- és nagybetűérzékenyek, a dátumok formátumérzékenyek. Biztosabb dátummegadás:

```sql
WHERE start_date > DATE '1999-06-30'
```

Összehasonlító operátorok:

- `=`, `>`, `>=`, `<`, `<=`, `<>`;
- `BETWEEN ... AND ...`, inkluzív intervallum;
- `IN(set)`, listaelem-vizsgálat;
- `LIKE`, mintaillesztés;
- `IS NULL`, nullérték-vizsgálat.

`LIKE` minták:

- `%`: nulla vagy több karakter;
- `_`: pontosan egy karakter.

Példa:

```sql
WHERE last_name LIKE '_U%'
```

NULL-ra:

```sql
WHERE manager_id IS NULL
WHERE commission IS NOT NULL
```

### Logikai operátorok és precedencia

Logikai operátorok:

- `AND`: mindkét feltétel igaz;
- `OR`: legalább az egyik feltétel igaz;
- `NOT`: a feltétel tagadása.

A diasor kiemeli, hogy a precedencia miatt zárójelezni kell, ha az értelmezés nem triviális. Példa:

```sql
WHERE position_id = 'SALES_MGR'
   OR position_id = 'ADMIN_PRES'
  AND salary > 11000
```

Itt az `AND` erősebb, ezért más jelentése lehet, mint:

```sql
WHERE (position_id = 'SALES_MGR'
    OR position_id = 'ADMIN_PRES')
  AND salary > 11000
```

### ORDER BY

Az `ORDER BY` az eredménysorokat rendezi, és a SELECT utasítás végén áll:

```sql
SELECT last_name, position_id, division_id, start_date
FROM workers
ORDER BY start_date DESC;
```

Rendezési irány:

- `ASC`: növekvő, alapértelmezett;
- `DESC`: csökkenő.

Több oszlop szerint is lehet rendezni:

```sql
SELECT last_name, division_id, 12 * salary "Annual salary"
FROM workers
ORDER BY division_id, salary DESC;
```

Alias szerint is lehet rendezni:

```sql
SELECT last_name, position_id, 12 * salary "Annual salary"
FROM workers
ORDER BY "Annual salary";
```

## SQL függvények és aggregátumok

Releváns oldalak: 357-372.

### SQL függvények fogalma

Az SQL függvények beépített adatbázis-függvények, amelyek adatokat manipulálnak és eredményt adnak vissza. Operátorokhoz hasonlóan működnek, de argumentumformátumuk miatt rugalmasabbak: lehet nulla, egy, kettő vagy több argumentumuk.

Ha egy függvényt nem a várt adattípusú argumentummal hívunk, az Oracle megpróbálhatja a típust a várt típusra konvertálni.

Két fő típus:

- egysoros függvények: minden bemeneti sorra egy eredményt adnak;
- többsoros vagy aggregátumfüggvények: sorok csoportjára egy eredményt adnak.

Egysoros függvények szerepelhetnek például `SELECT` listában, `WHERE`, `HAVING`, `START WITH` és `CONNECT BY` részekben.

Aggregátumfüggvény csoportja lehet:

- az egész tábla;
- a `WHERE` által szűrt résztábla;
- a `GROUP BY` által képzett csoport.

### Karakterfüggvények

Kis- és nagybetűkezelő függvények:

- `LOWER('SQL Course')` eredménye `sql course`;
- `UPPER('sql Course')` eredménye `SQL COURSE`;
- `INITCAP('SQL Course')` eredménye `Sql Course`.

Ezek szűrésnél is hasznosak:

```sql
SELECT worker_id, last_name, division_id
FROM workers
WHERE LOWER(last_name) = 'gauss';
```

Karaktermanipulációs függvények:

- `CONCAT`;
- `SUBSTR`;
- `LENGTH`;
- `INSTR`;
- `LPAD`, `RPAD`;
- `TRIM`, `LTRIM`, `RTRIM`;
- `REPLACE`, `TRANSLATE`.

Példák a PDF alapján:

```text
CONCAT('Buda', 'Pest') -> BudaPest
SUBSTR('San Francisco', 5, 7) -> Francis
LENGTH('SQL Language') -> 12
```

### Számfüggvények

Fontosabb számfüggvények:

- `POWER`;
- `SQRT`;
- `ROUND`;
- `TRUNC`;
- `CEIL`;
- `FLOOR`;
- `MOD`;
- trigonometrikus és logaritmikus függvények.

`ROUND` kerekít, `TRUNC` levág. A második argumentum a tizedesjegyek számát adja meg; negatív értékkel tízes, százas stb. helyiértékre lehet kerekíteni vagy vágni.

### Dátumfüggvények

`SYSDATE` az aktuális dátumot és időt adja vissza. Dátumhoz szám adható vagy vonható ki; két dátum különbsége a köztük lévő napok száma. Órák hozzáadásához az óraszámot 24-gyel osztva lehet napként hozzáadni.

Fontos dátumfüggvények:

- `MONTHS_BETWEEN`: két dátum közti hónapok száma;
- `ADD_MONTHS`: hónapokat ad dátumhoz;
- `NEXT_DAY`: következő adott nap;
- `LAST_DAY`: hónap utolsó napja;
- `ROUND`: dátum kerekítése;
- `TRUNC`: dátum csonkolása.

Például `TRUNC(SYSDATE, 'MONTH')` a hónap első napjára csonkol.

### Aggregátumfüggvények

Aggregátumfüggvények sorhalmazon működnek, és csoportonként egy eredményt adnak:

- `AVG`;
- `COUNT`;
- `MAX`;
- `MIN`;
- `STDDEV`;
- `SUM`;
- `VARIANCE`.

Példa:

```sql
SELECT AVG(salary), MAX(salary), MIN(salary), SUM(salary), COUNT(*)
FROM workers
WHERE position_id LIKE '%REP%';
```

`COUNT(*)` a sorok számát adja vissza. `COUNT(expr)` csak azokat a sorokat számolja, ahol `expr` nem `NULL`. `COUNT(DISTINCT expr)` a különböző, nem `NULL` értékeket számolja.

Vizsgaszempont: `COUNT(commission)` és `COUNT(*)` nem ugyanaz, ha a `commission` lehet `NULL`.

## GROUP BY, HAVING, aggregált lekérdezések

Releváns oldalak: 373-380.

### GROUP BY célja

A `GROUP BY` a tábla sorait kisebb csoportokra bontja. Az aggregátumfüggvények ezután csoportonként számolnak egy értéket.

Alapszintaxis:

```sql
SELECT column, group_function(column)
FROM table
[WHERE condition]
[GROUP BY group_by_expression]
[ORDER BY column];
```

Példa:

```sql
SELECT division_id, AVG(salary)
FROM workers
GROUP BY division_id;
```

### Kötelező SELECT-GROUP BY összhang

Minden olyan `SELECT`-beli oszlopnak vagy kifejezésnek, amely nem aggregátumfüggvényben van, szerepelnie kell a `GROUP BY` részben.

Helyes:

```sql
SELECT division_id, COUNT(last_name)
FROM workers
GROUP BY division_id;
```

Hibás:

```sql
SELECT division_id, COUNT(last_name)
FROM workers;
```

Azért hibás, mert `division_id` nem aggregált oszlop, de nincs `GROUP BY`.

### WHERE és HAVING különbsége

A `WHERE` sorokat szűr a csoportosítás előtt. Aggregátumfüggvény nem használható benne csoportfeltételként.

Hibás:

```sql
SELECT division_id, AVG(salary)
FROM workers
WHERE AVG(salary) > 8000
GROUP BY division_id;
```

Csoportok szűrésére `HAVING` kell:

```sql
SELECT division_id, AVG(salary)
FROM workers
GROUP BY division_id
HAVING AVG(salary) > 8000;
```

A `HAVING` működési sorrendje a diasor szerint:

1. a sorok csoportosítása,
2. csoportfüggvény alkalmazása,
3. a `HAVING` feltételnek megfelelő csoportok megjelenítése.

Ha egy feltétel soronként is eldönthető, érdemes `WHERE`-be tenni, mert az még csoportosítás előtt csökkenti a bemenetet. A `HAVING` akkor szükséges, amikor a feltétel a teljes csoportra számított értéktől függ.

### Példa HAVING használatára

```sql
SELECT position_id, SUM(salary) PAYROLL
FROM workers
WHERE position_id LIKE '%S%'
GROUP BY position_id
HAVING SUM(salary) > 13000
ORDER BY SUM(salary);
```

Itt:

- a `WHERE` előszűri a pozíciókat;
- a `GROUP BY` pozíciónként csoportosít;
- a `SUM(salary)` csoportonként számol;
- a `HAVING` csak a 13000 feletti csoportokat engedi tovább;
- az `ORDER BY` az aggregált érték szerint rendez.

### Beágyazott aggregátum

A diasor példája:

```sql
SELECT MAX(AVG(salary))
FROM workers
GROUP BY division_id;
```

Jelentése: először osztályonként kiszámítja az átlagfizetést, majd ezek közül veszi a maximumot.

## Többtáblás lekérdezések és JOIN-ok

Releváns oldalak: 381-395.

### JOIN célja

Többtáblás lekérdezésnél az adatokat több relációból kell összekapcsolni. A JOIN műveletek sorforrásokat kapcsolnak össze közös attribútum, megadott feltétel vagy keresztszorzat alapján.

A diasor JOIN-típusai:

- equi-join;
- natural join;
- `USING` clause;
- vendor-specifikus szintaxisok;
- outer join: left, right, full;
- non-equi join;
- cross join.

### NATURAL JOIN

Természetes illesztés:

```sql
SELECT division_id, division_name, city, country_id, country_name
FROM divisions
NATURAL JOIN countries;
```

A `NATURAL JOIN` az azonos nevű oszlopok alapján kapcsol. Használatánál fontos, hogy az azonos nevű oszlopok valóban azonos jelentésűek legyenek, mert a természetes illesztés névegyezésre támaszkodik.

### JOIN USING

Ha meg akarjuk adni, hogy mely közös nevű oszlop alapján történjen az illesztés:

```sql
SELECT e.worker_id, e.last_name, division_id, division_name
FROM workers e JOIN divisions d
USING (division_id);
```

A `USING` akkor használható, ha az illesztési oszlop azonos nevű a táblákban.

### Hagyományos Oracle-szintaxis és ON

Hagyományos, vesszős FROM és WHERE feltételes forma:

```sql
SELECT e.worker_id, e.last_name, e.division_id, division_name
FROM workers e, divisions d
WHERE e.division_id = d.division_id;
```

Modern `JOIN ... ON` forma:

```sql
SELECT e.worker_id, e.last_name, e.division_id, division_name
FROM workers e JOIN divisions d
ON e.division_id = d.division_id;
```

Az `ON` előnye, hogy az illesztési feltétel közvetlenül a JOIN mellett szerepel. Az aliasok, például `e` és `d`, a táblaoszlopok egyértelmű hivatkozására szolgálnak.

### Self join

Self join esetén ugyanazt a táblát több szerepben használjuk. Például dolgozó és menedzser ugyanabban a `workers` táblában lehet:

```sql
SELECT e.worker_id, e.last_name emp, m.last_name mgr
FROM workers e JOIN workers m
ON e.manager_id = m.worker_id;
```

Itt az `e` a dolgozó szerepű példány, az `m` a menedzser szerepű példány.

### Három tábla illesztése

Több join egymás után is alkalmazható:

```sql
SELECT e.worker_id, e.last_name, e.division_id,
       d.division_name, d.city, c.country_name
FROM workers e JOIN divisions d
ON e.division_id = d.division_id
JOIN countries c
ON c.country_id = d.country_id;
```

A diasor megjegyzi, hogy a legtöbb adatbázismotor egyszerre két sorforrást illeszt, és a további joinok ezekre épülnek.

### Non-equi join

Non-equi join esetén az illesztési feltétel nem egyenlőség. Példa:

```sql
SELECT e.first_name, e.last_name, e.salary, j.grade_level
FROM workers e JOIN job_grades j
ON e.salary BETWEEN j.lowest_sal AND j.highest_sal
WHERE last_name LIKE 'S%' OR last_name LIKE 'G%';
```

Itt a fizetés egy intervallumba esése alapján kapcsolódik a `job_grades` táblához.

### Outer join

Inner join esetén csak azok a sorok jelennek meg, amelyeknek van illeszkedő párja. Outer join esetén az egyik vagy mindkét oldal nem illeszkedő sorai is megmaradnak, a hiányzó másik oldali oszlopok `NULL` értéket kapnak.

Left outer join: a bal oldali, vezető tábla minden sora megjelenik:

```sql
SELECT e.last_name, d.division_id, d.division_name
FROM workers e LEFT OUTER JOIN divisions d
ON e.division_id = d.division_id;
```

Right outer join: a jobb oldali tábla minden sora megjelenik:

```sql
SELECT e.last_name, d.division_id, d.division_name
FROM workers e RIGHT OUTER JOIN divisions d
ON e.division_id = d.division_id;
```

Full outer join: mindkét oldal nem illeszkedő sorai is megjelennek:

```sql
SELECT e.last_name, d.division_id, d.division_name
FROM workers e FULL OUTER JOIN divisions d
ON e.division_id = d.division_id;
```

### Cross join

A `CROSS JOIN` Descartes-szorzatot állít elő:

```sql
SELECT last_name, division_name
FROM workers
CROSS JOIN divisions;
```

Minden bal oldali sor minden jobb oldali sorral párosodik. Ha az egyik tábla `m`, a másik `n` soros, az eredmény `m * n` soros.

