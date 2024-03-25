import "../index.css"
import React, { useState, useEffect } from 'react';
import obiteljSVG from '../assets/obitelj.svg';
import profesorSVG from '../assets/profesor.svg';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { SimpleFooter } from '@/components/footer';
import { SimpleHeader } from "@/components/header";


const Info = () => {



  return (

    <div className='w-full h-full'>
      <SimpleHeader>
      <div className="flex justify-center">
      <Button
        onClick={() => window.location.assign(`/`)}>
        Nazad
      </Button>
      </div>
      </SimpleHeader>
      
      <div className="flex justify-center gap-20 h-2/3 py-14 ">
        <Card className="min-h-full w-72" style={{ width: ""}}>
          <CardHeader>
            <CardTitle>Transparentnost Blockchaina</CardTitle>
          </CardHeader>
          <CardContent>
            BlockGrade koristi Ethereum blockchain za visoku transparentnost e-diploma. Svi podaci pohranjuju se na blockchainu, čineći ih dostupnima na Ethereum platformi.
          </CardContent>
          <CardFooter>
            <CardTitle>Neporecivost i Neizmjenjivost</CardTitle>

          </CardFooter>
          <CardContent>Blockchain osigurava neporecivost i neizmjenjivost izdanih diploma s jedinstvenim identifikatorom.</CardContent>
        </Card>

        <Card className="min-h-full w-72" style={{ width: ""}}>
          <CardHeader>
            <CardTitle>Automatizacija Izdavanja Uvjerenja</CardTitle>
          </CardHeader>
          <CardContent>
            Pametni ugovori omogućuju brzo i učinkovito izdavanje diploma, smanjujući ručne intervencije.
          </CardContent>
          <CardFooter>
            <CardTitle>Povezanost s Identitetom Ravnatelja</CardTitle>

          </CardFooter>
          <CardContent>Svako uvjerenje je povezano s identitetom ravnatelja, pridonoseći sigurnosti i povjerenju u ispravnost podataka.</CardContent>
        </Card>

        <Card className="min-h-full w-72" style={{ width: ""}}>
          <CardHeader>
            <CardTitle>Dodatne informacije</CardTitle>
          </CardHeader>
          <CardContent>
            Ovdje možete dodati dodatne informacije o sustavu BlockGrade.


          </CardContent>
          <CardHeader>
            <CardTitle>Linkovi</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              <Button variant={"link"}><li><a href="https://docs.google.com/presentation/d/1lFtP7JAIdi0TmIeXEr87uiyQ4m_X6nZSoZcjwSH7ovM/">Prezentacija</a></li></Button>
              <Button variant={"link"}><li><a href="https://block-grade.vercel.app/ediploma?code=4891aff173ac1187">Primjer E-diplome</a></li></Button>
            </ul>
          </CardContent>




          <CardHeader>
            <CardTitle>Autori</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              <Button variant={"link"}><li><a href="https://github.com/toni-d-e-v">Toni Dumančić</a></li></Button>
              <Button variant={"link"}><li><a href="https://github.com/RokoVidovic">Roko Vidović</a></li></Button>
            </ul>
          </CardContent>
        </Card>

      </div>
      <SimpleFooter></SimpleFooter>

    </div>

  );
};

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '75vh',
};

const boxStyle = {
  width: '250px',
  height: '350px',
  backgroundColor: '#fff',
  border: '2px solid #3498db',
  borderRadius: '8px',
  margin: '0 10px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '25px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const buttonStyle = {
  marginTop: '10px',
  padding: '8px 16px',
  backgroundColor: '#3498db',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
};
const buttonStyle_2 = {
  padding: '8px 8px',
  margin: '5px',
  backgroundColor: '#3498db',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
};
// Responsive styles
const mediaQuery = `@media (max-width: 768px) {
    ${boxStyle} {
      width: 80%;
    }
  }`;
const headerStyle = {

  backgroundColor: '#fff',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '14vh',
  fontSize: '4vh',
  borderRadius: '10px',
  padding: '20px'
};
const footerStyle = {

  backgroundColor: '#fff',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '10vh',
  marginBottom: '25px',
  borderRadius: '10px',
  padding: '10px'

};
export default Info;
