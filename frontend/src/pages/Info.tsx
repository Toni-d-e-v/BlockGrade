// shadcn/ui Component Imports
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import React, { useState, useEffect } from 'react';
import obiteljSVG from '../assets/obitelj.svg';
import profesorSVG from '../assets/profesor.svg';

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
      
      <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch gap-20 h-2/3 py-14 ">
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

export default Info;
