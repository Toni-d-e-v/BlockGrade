// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract UvjerenjeUgovor {

    struct Ravnatelj {
        string ime;
        string imeSkole;
        address idRavnatelja;
    }

    struct Uvjerenje {
        string imeNositelja;
        string opis;
        string imeSkole; 
        Ravnatelj ravnatelj;
        string[] predmeti;
        uint8[] ocjene;
        uint256 datum;
    }

    address public vlasnik;
    mapping(address => Ravnatelj) public ravnatelji;
    mapping(bytes8 => Uvjerenje) public uvjerenja;
    mapping(address => bytes8[]) public ravnateljUvjerenja;

    event RavnateljDodan(address indexed adresa, string ime, string imeSkole, address indexed idRavnatelja);
    event UvjerenjeIzdano(address indexed adresa, bytes8 indexed id, string imeNositelja, string opis, string[] predmeti, uint8[] ocjene);

    modifier samoVlasnik() {
        require(msg.sender == vlasnik, "Samo vlasnik moze pristupiti ovoj funkciji");
        _;
    }

    constructor() {
        vlasnik = msg.sender;
    }

    function prenesiVlasnistvo(address noviVlasnik) external samoVlasnik {
        require(noviVlasnik != address(0), "Nevazeca adresa novog vlasnika");
        vlasnik = noviVlasnik;
    }

    function dodajRavnatelja(string memory ime, string memory imeSkole, address idRavnatelja) external samoVlasnik {
        Ravnatelj storage noviRavnatelj = ravnatelji[idRavnatelja];
        noviRavnatelj.ime = ime;
        noviRavnatelj.imeSkole = imeSkole;
        noviRavnatelj.idRavnatelja = idRavnatelja;
        emit RavnateljDodan(idRavnatelja, ime, imeSkole, idRavnatelja);
    }

    function izdajUvjerenje(string memory imeNositelja, string memory opis, string[] memory predmeti, uint8[] memory ocjene) external {
        require(predmeti.length == ocjene.length, "Neispravan unos: predmeti i ocjene moraju imati istu duzinu");
        Ravnatelj storage ravnatelj = ravnatelji[msg.sender];

        bytes8 id = generisiUniqueId();
        Uvjerenje storage novoUvjerenje = uvjerenja[id];
        novoUvjerenje.imeNositelja = imeNositelja;
        novoUvjerenje.opis = opis;
        novoUvjerenje.imeSkole = ravnatelj.imeSkole; // Ime skole uzeto iz podataka o ravnatelju
        novoUvjerenje.ravnatelj = ravnatelj;
        novoUvjerenje.predmeti = predmeti;
        novoUvjerenje.ocjene = ocjene;
        novoUvjerenje.datum = block.timestamp;

        ravnateljUvjerenja[msg.sender].push(id);
        emit UvjerenjeIzdano(msg.sender, id, imeNositelja, opis, predmeti, ocjene);
    }

    function generisiUniqueId() internal view returns (bytes8) {
        return bytes8(keccak256(abi.encodePacked(block.timestamp, block.difficulty, msg.sender)));
    }

    function dohvatiUvjerenje(bytes8 id) external view returns (
        string memory imeNositelja,
        string memory opis,
        string memory imeSkole,
        Ravnatelj memory ravnatelj,
        string[] memory predmeti,
        uint8[] memory ocjene,
        uint256 datum
    ){
        Uvjerenje storage uvjerenje = uvjerenja[id];

        return (
            uvjerenje.imeNositelja,
            uvjerenje.opis,
            uvjerenje.imeSkole,
            uvjerenje.ravnatelj,
            uvjerenje.predmeti,
            uvjerenje.ocjene,
            uvjerenje.datum 
        );
    }

}
