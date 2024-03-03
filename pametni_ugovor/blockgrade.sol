// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract BlockGrade {
    // Structs
    struct Biljeska {
        int32 predmetniNastavnikId;
        int32 predmetId;
        string datum;
        string sadrzaj;
    }

    struct Ucenik {
        int32 id;
        string Odjel;
        mapping(int32 => int8) ocjene;
        mapping(int32 => Biljeska[]) biljeske;
    }   

    struct Profesor {
        int32 id;
        string Ime;
        address adresaa;
        int32 predmetId;
    } 

    struct Skola {
        int32 id;
        string naziv;
        address direktor;
        mapping(address => bool) profesori;
    }

    struct Predmet {
        int32 id;
        string Naziv;
    }



    // Mappings
    mapping(int32 => Ucenik) public ucenici;
    mapping(int32 => Profesor) public profesori;
    mapping(int32 => Skola) public skole;
    mapping(int32 => Predmet) public predmeti;

    // Events
    event DodanUcenik(int32 ucenikId, string odjel);
    event DodanProfesor(int32 profesorId, string ime, address profesorAdresa);
    event DodanaOcjena(int32 ucenikId, int32 predmetId, int8 ocjena);
    event DodanaSkola(int32 skolaId, string naziv, address direktor);
    event DodanaBiljeska(int32 ucenikId, int32 predmetniNastavnikId, int32 predmetId, string datum, string sadrzaj);
    event ObrisanaSkola(int32 skolaId);

    // Modifiers
    modifier samoOwner() {
        require(msg.sender == owner, "Samo vlasnik moze pristupiti ovoj funkciji.");
        _;
    }

    modifier samoOwnerSkole(int32 skolaId) {
        require(msg.sender == skole[skolaId].direktor || msg.sender == owner, "Samo direktor skole ili super admin moze pristupiti ovoj funkciji.");
        _;
    }

    modifier samoPredmetniNastavnik(int32 profesorId, int32 predmetId) {
        require(profesori[profesorId].predmetId == predmetId, "Samo predmetni nastavnik moze postavljati ocjene za ovaj predmet.");
        _;
    }

    // Owner variables
    address public owner;

    // Constructor to set the contract deployer as the owner
    constructor() {
        owner = msg.sender;
    }

    // Functions for Super Admin (Owner)
    function dodajSkolu(int32 skolaId, string memory naziv, address direktor) public samoOwner {
        Skola storage novaSkola = skole[skolaId];
        novaSkola.id = skolaId;
        novaSkola.naziv = naziv;
        novaSkola.direktor = direktor;



        emit DodanaSkola(skolaId, naziv, direktor);
    }

    function obrisiSkolu(int32 skolaId) public samoOwner {
        require(skole[skolaId].id == skolaId, "Skola s ovim ID-om ne postoji.");

        delete skole[skolaId];
        emit ObrisanaSkola(skolaId);
    }

    function postaviDirektora(int32 skolaId, address direktor) public samoOwner {
        skole[skolaId].direktor = direktor;
    }

    function promijeniVlasnika(address noviVlasnik) public samoOwner {
        owner = noviVlasnik;
    }

    function dodajProfesoraSkoli(int32 skolaId, int32 profesorId, string memory ime, address profesorAdresa, int32 predmetId) public samoOwnerSkole(skolaId) {
        Profesor storage noviProfesor = profesori[profesorId];
        noviProfesor.id = profesorId;
        noviProfesor.Ime = ime;
        noviProfesor.adresaa = profesorAdresa;
        noviProfesor.predmetId = predmetId;

        skole[skolaId].profesori[profesorAdresa] = true;
        emit DodanProfesor(profesorId, ime, profesorAdresa);
    }

    function dodajUcenikaSkoli(int32 skolaId, int32 ucenikId, string memory odjel) public samoOwnerSkole(skolaId) {
        Ucenik storage noviUcenik = ucenici[ucenikId];
        noviUcenik.id = ucenikId;
        noviUcenik.Odjel = odjel;

        emit DodanUcenik(ucenikId, odjel);
    }

    function dodajOcenuSkoli(int32 skolaId, int32 profesorId, int32 ucenikId, int32 predmetId, int8 ocjena) public samoOwnerSkole(skolaId) samoPredmetniNastavnik(profesorId, predmetId) {
        Ucenik storage targetUcenik = ucenici[ucenikId];
        targetUcenik.ocjene[predmetId] = ocjena;

        emit DodanaOcjena(ucenikId, predmetId, ocjena);
    }

    function dodajBiljesku(int32 ucenikId, int32 predmetniNastavnikId, int32 predmetId, string memory datum, string memory sadrzaj) public {
        require(msg.sender == profesori[predmetniNastavnikId].adresaa, "Samo predmetni nastavnik moze dodavati biljeske za ovaj predmet.");

        Biljeska memory novaBiljeska = Biljeska({
            predmetniNastavnikId: predmetniNastavnikId,
            predmetId: predmetId,
            datum: datum,
            sadrzaj: sadrzaj
        });

        Ucenik storage targetUcenik = ucenici[ucenikId];
        targetUcenik.biljeske[predmetId].push(novaBiljeska);

        emit DodanaBiljeska(ucenikId, predmetniNastavnikId, predmetId, datum, sadrzaj);
    }
    
}
