import React, { useState, useEffect } from 'react';
import { Moon, Sun } from "lucide-react"
import obiteljSVG from '../assets/obitelj.svg';
import profesorSVG from '../assets/profesor.svg';
import logo from '../assets/logo.png'
import { ethers, JsonRpcProvider } from 'ethers';
import BlockGradeABI from '../../BlockGrade.json';
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"

import { Input } from "@/components/ui/input"
import "../index.css"
import githubLogo from "../assets/github-mark.svg"
import { SimpleFooter } from '@/components/footer';
import { SimpleHeader } from '@/components/header';


const Main = () => {
  const [code, setCode] = useState('');
  const [latestEvents, setLatestEvents] = useState([]);
  
  const { setTheme } = useTheme()
  const { toast } = useToast()
  return (
    <div className='flex flex-col justify-between'>



      <SimpleHeader>
      <div className = "flex justify-center">

      <Button size="lg"
        onClick={
          () => window.location.assign("/direktor")
        }
      >Direktor Panel</Button>
      </div>
      </SimpleHeader>


      <div className='grid grid-flow-col justify-center items-center gap-20 h-2/3 my-20'>

        <Card className="w-64 h-full">
          <CardHeader>
            <img src={obiteljSVG} alt="Obitelj"/>
            <CardTitle className='text-center'>Zelim vidjeti <br></br>E-Diplomu</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              type="text" // Assuming it's a text input
              value={code} // Use state or a variable to store the input value
              onChange={(e) => setCode(e.target.value)} // Update the state or variable on input change
              placeholder='ID diplome'
            />
            
          </CardContent>
          <CardFooter className='justify-center'>
          <Button
              onClick={() => {
                if (code) {
                  window.location.assign(`/ediploma?code=${code}`);
                }
                else {
                  toast({
                    variant: "destructive",
                    title: "Pogrešan ID",
                    description: "Unesite ID Diplome",
                  })
                }
              }}
            >
              Nastavi
            </Button>
          </CardFooter>
        </Card>



        <Card className="w-64 h-full">
          <CardHeader>
            <CardTitle>Kako radi?</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Sustav koristi prednosti blockchain tehnologije kako bi osigurao  neizmjenjivost izdanih diploma.</p>
            <br></br>
            <p>BlockGrade koristi Ethereum blockchain kako bi omogućio visoku razinu transparentnosti. </p>
            
          </CardContent>
          <CardFooter className='flex-col'>
          <Button className='m-5' variant="secondary" onClick={() => {
              window.location.assign("/info")
            }}>
              Dodatne informacije
            </Button>
            <p className="signature_verify">
              Blockchain provjereno!
            </p>
          </CardFooter>
        </Card>


      </div>
      <Toaster />
<SimpleFooter></SimpleFooter>

</div>
  );
};

export default Main;
