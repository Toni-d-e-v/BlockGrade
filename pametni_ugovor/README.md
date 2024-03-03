# BlockGrade - Ethereum Pametni Ugovor za Praćenje Ocjena u Školama

## Funkcionalnosti

1. **Dodavanje Škole i Direktora:**
   - Superadmin (vlasnik ugovora) može dodavati nove škole.
   - Superadmin može postaviti direktora za svaku školu.

2. **Dodavanje Profesora:**
   - Direktor škole može dodavati profesore u svoju školu.
   - Dodani profesori imaju svoje jedinstvene identifikatore, ime, adresu i predmet koji predaju.

3. **Dodavanje Učenika:**
   - Direktor škole može dodavati učenike u svoju školu.
   - Dodani učenici imaju jedinstvene identifikatore i pripadaju određenom odjelu.

4. **Povezivanje Profesora s Predmetom:**
   - Direktor škole određuje koji profesor predaje koji predmet.

5. **Postavljanje Ocjena:**
   - Profesor može postavljati ocjene učenicima na određenim predmetima.
   - Postavljanje ocjena ograničeno je na predmetnog nastavnika tog predmeta.

6. **Promjena Vlasnika:**
   - Superadmin može promijeniti vlasnika ugovora, tj. osobu koja ima potpunu kontrolu nad ugovorom.

7. **Pristup Kontroliranim Funkcijama:**
   - Određene funkcije (npr. dodavanje škole, dodavanje profesora) su kontrolirane modifierima `samoOwner` i `samoOwnerSkole`, osiguravajući da samo određene osobe imaju pristup određenim funkcionalnostima.

8. **Sigurnost:**
   - Koristi Unicode simbole u `require` izjavama za bolju čitljivost i podršku za različite jezike.

## Opis
Ovaj pametni ugovor pruža osnovnu implementaciju sustava za praćenje ocjena na Ethereum blockchainu. Sustav donosi transparentnost i nepromjenjivost podataka pomoću Ethereum blockchaina, čime se osigurava integritet podataka u edukacijskom sustavu.
