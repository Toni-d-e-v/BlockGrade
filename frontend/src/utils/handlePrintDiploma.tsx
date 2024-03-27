//import jsPDF from 'jspdf';
import jsPDF from 'jspdf';
import qrImage from 'qr-image'; // Import qr-image library
import hackathonLogo from '../assets/logo-HACKATHON.png';
import logo from '../assets/logo.png';

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

 const handlePrintDiploma = (state, id) => {
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

  export { handlePrintDiploma, replaceCroatianLetters};