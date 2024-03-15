import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import qrImage from 'qr-image'; // Import qr-image library
import './Diploma.css';
import { ethers, JsonRpcProvider } from 'ethers';
import BlockGradeABI from '../../BlockGrade.json';
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
  const handlePrintDiploma = () => {
    const doc = new jsPDF();
    const margin = 10;
    const startY = 20;

    // Add border
    doc.setDrawColor(44, 62, 80);
    doc.setLineWidth(2);
    doc.rect(margin, startY, doc.internal.pageSize.getWidth() - 2 * margin, 300); // Adjust height according to your content

    // Add header
    doc.setFontSize(18);
    doc.setTextColor(44, 62, 80);
    doc.text('Blockgrade - E-diploma', 105, startY + 10, { align: 'center' });

    // Add diploma information
    doc.setFontSize(12);
    doc.setTextColor(44, 62, 80);

    doc.text(`Ime i Prezime: ${state.Certificate[0]}`, margin + 10, startY + 30);
    doc.text(`Opis: ${state.Certificate[1]}`, margin + 10, startY + 40);
    doc.text(`Škola: ${state.Certificate[2]}`, margin + 10, startY + 50);
    doc.text(`Ravnatelj: ${state.Certificate[3][0]}`, margin + 10, startY + 60);

    // Add table for subjects
    const tableColumns = ['Predmet', 'Ocjena'];
    const tableRows = [];
    if (state.Certificate[4] && state.Certificate[5]) {
        state.Certificate[4].forEach((subject, index) => {
            const grade = state.Certificate[5][index] || '';
            tableRows.push([subject, grade]);
        });

        const tableWidth = 60 * tableColumns.length + 30; // Calculate total table width
        const tableX = (doc.internal.pageSize.getWidth() - tableWidth) / 2; // Calculate X position to center the table

        const tableHeight = doc.autoTable.previous.finalY - startY + 20;
        const tableY = startY + 70;

        doc.autoTable({
            head: [tableColumns],
            body: tableRows,
            startY: tableY,
            margin: { top: tableY, left: 50, right: 0, bottom: 0 },
            styles: { textColor: [44, 62, 80], fontSize: 12, fontStyle: 'bold' },
            columnStyles: {
                0: { cellWidth: 50 },
                1: { cellWidth: 50 },
            },
        });
    }

    // Add QR code
    const qrText = `https://block-grade.vercel.app/ediploma?code=${id}`;
    const qrImageBuffer = qrImage.imageSync(qrText, { type: 'png' });
    const qrBase64 = Buffer.from(qrImageBuffer).toString('base64');
    doc.addImage(`data:image/png;base64,${qrBase64}`, 'PNG', margin + 10, 240, 50, 50);
    doc.text(`ID:${id}`, margin + 15 , 244);

    doc.text(`Skenirajte QR code da biste provjerili E-diplomu!`, margin + 15 , 290);

    
    doc.save('diploma.pdf');
};

  return (
    <div style={{ paddingTop: '2vh' }}>
      <div className="box">
        <div className="header_diploma">
          <h3>Blockgrade E-diploma</h3>
        </div>
        <div>
          <ul>
            <div className="center-part">
              <div className="name-section">
                <h4>Ime i Prezime:</h4>
                <p>{state.Certificate[0]}</p>
              </div>
              <div className="description-section">
                <h4>Opis:</h4>
                <p>{state.Certificate[1]}</p>
              </div>
              <div className="school-section">
                <h4>Škola:</h4>
                <p>{state.Certificate[2]}</p>
              </div>
            </div>
            <div>
              {(state.Certificate[4] || state.Certificate[5]) && (
                <table className='tabledip'>
                  <thead>
                    <tr>
                      <th>Predmet</th>
                      <th>Ocjena</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.Certificate[4].map((subject, index) => (
                      <tr key={index}>
                        {state.Certificate[5] && state.Certificate[5][index] && (
                          <>
                            <td>{subject}</td>
                            <td>{Number(state.Certificate[5][index])}</td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <div className="ravnatelj">
              {state.Certificate[3] && (
                <div className="ravnatelj-container">
                  <div className="button-container">
                    <button className='button-17' onClick={handlePrintDiploma}>Printaj</button>
                  </div>
                  <div>
                    <p>
                      <p className="signature">{state.Certificate[3][0]}</p>
                    </p>
                    <p className="blockchain-link">
                      <a href={`https://goerli.etherscan.io/address/${state.Certificate[3][2]}`} target="_blank" rel="noopener noreferrer">
                        Blockchain adresa 🌐⛓️
                      </a>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </ul>
        </div>
      </div>
      <div className='verify'>
        <p className="signature_verify">Blockchain provjereno!</p>
      </div>
    </div>
  );
};

export default EDiploma;
