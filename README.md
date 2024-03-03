# /smartcontracts
Ovaj pametni ugovor, nazvan "BlockGrade", implementira osnovni sustav e-dnevnika na Ethereum blockchainu za praćenje ocjena učenika i rad profesora u školama. Evo ključnih mogućnosti i funkcionalnosti koje nudi:

    Dodavanje Škole i Direktora:
        Superadmin (vlasnik ugovora) može dodavati nove škole.
        Superadmin može postaviti direktora za svaku školu.

    Dodavanje Profesora:
        Direktor škole može dodavati profesore u svoju školu.
        Dodani profesori imaju svoje jedinstvene identifikatore, ime, adresu i predmet koji predaju.

    Dodavanje Učenika:
        Direktor škole može dodavati učenike u svoju školu.
        Dodani učenici imaju jedinstvene identifikatore i pripadaju određenom odjelu.

    Povezivanje Profesora s Predmetom:
        Direktor škole određuje koji profesor predaje koji predmet.

    Postavljanje Ocjena:
        Profesor može postavljati ocjene učenicima na određenim predmetima.
        Postavljanje ocjena ograničeno je na predmetnog nastavnika tog predmeta.

    Promjena Vlasnika:
        Superadmin može promijeniti vlasnika ugovora, tj. osobu koja ima potpunu kontrolu nad ugovorom.

    Pristup Kontroliranim Funkcijama:
        Određene funkcije (npr. dodavanje škole, dodavanje profesora) su kontrolirane modifierima samoOwner i samoOwnerSkole, osiguravajući da samo određene osobe imaju pristup određenim funkcionalnostima.

    Sigurnost:
        Koristi Unicode simbole u require izjavama za bolju čitljivost i podršku za različite jezike.

Ovaj ugovor je osnovni primjer implementacije sustava za praćenje ocjena na blockchainu i može se nadograđivati i prilagoditi prema potrebama. Važno je napomenuti da ovakav sustav donosi transparentnost i nepromjenjivost podataka pomoću Ethereum blockchaina, čime se osigurava integritet podataka u edukacijskom sustavu.
