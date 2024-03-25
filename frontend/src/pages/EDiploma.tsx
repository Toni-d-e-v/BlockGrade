import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import qrImage from 'qr-image'; // Import qr-image library
import { ethers, JsonRpcProvider } from 'ethers';
import BlockGradeABI from '../../BlockGrade.json';
import { Skeleton } from "@/components/ui/skeleton"

import logo from '../assets/logo.png';
import hackathonLogo from '../assets/logo-HACKATHON.png';
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

import 'jspdf-autotable'; // Import jspdf-autotable


const EDiploma = () => {
  const initialState = { accounts: [], Certificate: [] };
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('code') || '';

  useEffect(() => {
    const connectToBlockchain = async () => {
      const provider = new JsonRpcProvider('https://rpc.tornadoeth.cash/goerli');
      const Certificate = await getCertificates(provider, id);
      setInitialState({ Certificate });
    };

    connectToBlockchain();
  }, [id]);

  const [state, setInitialState] = useState(initialState);

  const getCertificates = async (provider, id) => {
    try {
      const blockGradeContract = new ethers.Contract(
        '0xf7109ebbe9e8fdaee66a8806c6645cb0bfe31f71',
        BlockGradeABI.abi,
        provider
      );
      const Certificate = await blockGradeContract.dohvatiUvjerenje('0x' + id);
      console.log(Certificate, '0x' + id);
      return Certificate;
    } catch (error) {
      console.error('Error fetching Certificate:', error.message || error);
      window.location = '/';
      return [];
    }
  };
  const replaceCroatianLetters = (text) => {
    const croatianLetters = {
      "č": "c", "Č": "C",
      "ć": "c", "Ć": "C",
      "ž": "z", "Ž": "Z",
      "š": "s", "Š": "S",
      "đ": "dj", "Đ": "Dj",
    };
    return text.replace(/[čćžšđ]/g, (letter) => croatianLetters[letter] || letter);
  }
  const handlePrintDiploma = () => {
    const doc = new jsPDF();
    const margin = 10;
    const startY = 20;

    // Add header
    doc.setFontSize(18);
    doc.setTextColor(44, 62, 80);
    doc.text('Blockgrade - E-diploma', 105, startY + 10, { align: 'center' });

    // Add diploma information
    doc.setFontSize(12);
    doc.setTextColor(44, 62, 80);

    doc.text(`Ime i Prezime: ${replaceCroatianLetters(state.Certificate[0])}`, margin + 10, startY + 30);
    doc.text(`Opis: ${replaceCroatianLetters(state.Certificate[1])}`, margin + 10, startY + 40);
    const certificateText = `Škola: ${replaceCroatianLetters(state.Certificate[2])}`;
    doc.text(certificateText, margin + 10, startY + 50);
    doc.text(`Ravnatelj: ${replaceCroatianLetters(state.Certificate[3][0])}`, margin + 10, startY + 60);

    // Add table for subjects
    const tableColumns = ['Predmet', 'Ocjena'];
    const tableRows = [];
    if (state.Certificate[4] && state.Certificate[5]) {
      state.Certificate[4].forEach((subject, index) => {
        const grade = state.Certificate[5][index] || '';
        tableRows.push([subject, grade]);
      });

      const tableWidth = 90 * tableColumns.length + 50; // Calculate total table width
      const tableX = (doc.internal.pageSize.getWidth() - tableWidth) / 2; // Calculate X position to center the table

      const tableHeight = doc.autoTable.previous.finalY - startY + 40;
      const tableY = startY + 70;

      doc.autoTable({
        head: [tableColumns],
        body: tableRows,
        startY: tableY,
        margin: { top: tableY, left: 50, right: 0, bottom: 0 },
        1: { cellWidth: 50, textColor: [255, 255, 255] }, // Setting text color to white for the second column
        columnStyles: {
          0: { cellWidth: 60 },
          1: { cellWidth: 50 },
        },
      });
    }

    // Add QR code
    const qrText = `https://block-grade.vercel.app/ediploma?code=${id}`;
    const qrImageBuffer = qrImage.imageSync(qrText, { type: 'png' });
    const qrBase64 = Buffer.from(qrImageBuffer).toString('base64');
    doc.addImage(`data:image/png;base64,${qrBase64}`, 'PNG', margin + 10, 240, 50, 50);
    doc.text(`ID:${id}`, margin + 15, 244);
    // Add logos
    const logoImg = new Image();
    const hackathonLogoImg = new Image();

    logoImg.src = logo;
    hackathonLogoImg.src = hackathonLogo;

    doc.addImage(logoImg, 'PNG', margin + 10, 10, 30, 30);
    doc.addImage(hackathonLogoImg, 'PNG', margin + 140, 10, 55.14, 30);
    doc.text(`Skenirajte QR code da biste provjerili E-diplomu!`, margin + 15, 290);
    doc.text(`Generirano od strane BlockGrade-a`, margin + 120, 290);

    doc.autoPrint(); // Automatically prints the PDF
    window.open(doc.output('bloburl'), '_blank'); // Opens the PDF in a new tab for printing
  };

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
        <Button size="lg" className="" onClick={handlePrintDiploma}>Printaj</Button>
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
