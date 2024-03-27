// shadcn/ui Component Imports
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

import { getCertificates } from "@/utils/getCertificates"
import { handlePrintDiploma } from "@/utils/handlePrintDiploma"
import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import qrImage from 'qr-image'; // Import qr-image library
import { ethers, JsonRpcProvider } from 'ethers';
import BlockGradeABI from '../../BlockGrade.json';
import 'jspdf-autotable'; // Import jspdf-autotable

import logo from '../assets/logo.png';
import hackathonLogo from '../assets/logo-HACKATHON.png';


const EDiploma = () => {
  const initialState = { accounts: [], Certificate: [] };
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('code') || '';

  useEffect(() => {
    const connectToBlockchain = async () => {
        const provider = new JsonRpcProvider('https://rpc.tornadoeth.cash/goerli');
        try {
            const Certificate = await getCertificates(provider, id);
            setInitialState({ Certificate });
        } catch (error) {
            window.location = '/'; // Redirect to root on error
        }
    };

    connectToBlockchain();
}, [id]);


  const [state, setInitialState] = useState(initialState);

  

  


  return (

    <div className='flex flex-col justify-center items-center min-h-full'>
      <div className='flex justify-center  w-full'>
        <Card className='drop-shadow-md hover:drop-shadow-xl align-center duration-300 m-5 PX-max' style={{ width: "35.35rem", height: "50rem" }}>
          <CardHeader>
            <CardTitle className="text-center">Blockgrade E-diploma</CardTitle>

          </CardHeader>
          <CardContent>
            <Table className='mb-3'>
              <TableBody >
                <TableRow>
                  <TableCell>Ime i Prezime:</TableCell>
                  <TableCell>{state.Certificate[0]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Opis:</TableCell>
                  <TableCell>{state.Certificate[1]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Škola:</TableCell>
                  <TableCell>{state.Certificate[2]}</TableCell>
                </TableRow>
              </TableBody>
            </Table>




            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Predmet</TableHead>
                  <TableHead>Ocjena</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody >
                {state.Certificate[4] ? (
                  state.Certificate[4].map((subject, index) => (
                    <TableRow key={index}>
                      {state.Certificate[5] && state.Certificate[5][index] && (
                        <>
                          <TableCell className='p-2'>{subject}</TableCell>
                          <TableCell className='p-2'>{Number(state.Certificate[5][index])}</TableCell>
                        </>
                      )}
                    </TableRow>
                  ))
                ) : (
                  // Loading skeleton
                  <TableCell className='p-2'>Loading...</TableCell>
                )}

              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="justify-end" >
            {state.Certificate[3] && (
              <div className="grid">

                <p className="signature">{state.Certificate[3][0]}</p>

                <p className="blockchain-link">
                  <a href={`https://goerli.etherscan.io/address/${state.Certificate[3][2]}`} target="_blank" rel="noopener noreferrer">
                    Blockchain adresa 🌐⛓️
                  </a>
                </p>
              </div>

            )}
          </CardFooter>
        </Card>
      </div>
      <footer className='flex justify-center items-center gap-3'>
        <Button size="lg" className="" onClick={state && id ? () => handlePrintDiploma(state, id) : undefined}>Printaj</Button>
        <Button
          onClick={() => window.location.assign(`/`)}>
          Nazad
        </Button>
        <div className='verify'>
          <p className="signature_verify">Blockchain provjereno!</p>
        </div>
      </footer>



    </div>
  );
};

export default EDiploma;
