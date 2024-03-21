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


const Main = () => {
  const [code, setCode] = useState('');
  const [latestEvents, setLatestEvents] = useState([]);
  
  const { setTheme } = useTheme()
  const { toast } = useToast()
  return (
    

    <div className="bg-background" style={{ width: "100%", height: "100%" }}>

      <header className='flex justify-center p-10'>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl text-foreground">BlockGrade - E-Diploma</h1>
      </header>

      <Button variant="" className="text-base"
        onClick={
          () => window.location = "/direktor"
        }
      >Direktor Panel</Button>

      <div className='flex justify-center items-center h-[60vh]'>

        <Card className='m-5' style={{ width: "17rem" }}>
          <CardHeader>
            <img src={obiteljSVG} alt="Obitelj" />
            <CardTitle>Zelim vidjeti <br></br>E-Diplomu</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              type="text" // Assuming it's a text input
              value={code} // Use state or a variable to store the input value
              onChange={(e) => setCode(e.target.value)} // Update the state or variable on input change
              placeholder='ID diplome'
            />
            <Button className='m-5'
              onClick={() => {
                if (code) {
                  window.location = `/ediploma?code=${code}`;
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
          </CardContent>
          <CardFooter>
          </CardFooter>
        </Card>



        <Card className="m-5" style={{ width: "17rem", }}>
          <CardHeader>
            <CardTitle>Kako radi?</CardTitle>

          </CardHeader>
          <CardContent>
            <p>Sustav koristi prednosti blockchain tehnologije kako bi osigurao  neizmjenjivost izdanih diploma.</p>
            <br></br>
            <p>BlockGrade koristi Ethereum blockchain kako bi omogućio visoku razinu transparentnosti. </p>
            <Button className='m-5' variant="secondary"><a
              href='/info'
            >
              Dodatne informacije
            </a></Button>


            <p className="signature_verify">
              Blockchain provjereno!
            </p>
          </CardContent>

        </Card>


      </div>
      <footer className='flex justify-center items-center p-5 absolute bottom-0 w-full'>
        <Button onClick={() => window.location = "https://github.com/Toni-d-e-v/BlockGrade"} variant="secondary">
          <img src={githubLogo} alt="Github Logo" width="30" className='mr-2' />
          Github
        </Button>
        <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
        <p className="ml-10 text-foreground"> BlockGrade - E-diplome - Projekt za sum.ba Code Challenge 2024 </p>
      </footer>
      <Toaster />

    </div>

  );
};

// Stari style-ovi koji se vise ne koriste

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '60vh',
};

const boxStyle = {
  width: '250px',
  height: '300px',
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
export default Main;
