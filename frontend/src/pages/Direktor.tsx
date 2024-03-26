import React, { useState, useEffect } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';
import BlockGradeABI from '../../BlockGrade.json';
import './Direktor.css'
import { Button } from '@/components/ui/button';
import { SimpleFooter } from '@/components/footer';
import { SimpleHeader } from '@/components/header';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CircleX, X, Plus } from "lucide-react"

const Direktor = () => {
  const { toast } = useToast()
  const initialState = { accounts: [], chainId: null };
  const [wallet, setWallet] = useState(initialState);
  const [connected, setConnected] = useState(false);
  const [blockGradeContract, setBlockGradeContract] = useState(null);

  // Screen state
  const [currentScreen, setCurrentScreen] = useState(1);

  const [studentName, setStudentName] = useState('');
  const [description, setDescription] = useState('');
  const [subjectRows, setSubjectRows] = useState([{ subject: '', grade: '' }]);
  const [issuedCertificateId, setIssuedCertificateId] = useState(null);

  // Loading state
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkEthereumProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });
      if (provider) {
        handleChainChanged(await provider.request({ method: 'eth_chainId' }));
        handleAccountsChanged(await provider.request({ method: 'eth_accounts' }));
        provider.on('chainChanged', handleChainChanged);
        provider.on('accountsChanged', handleAccountsChanged);
      }
    };

    checkEthereumProvider();

    return () => {
      window.ethereum?.removeListener('chainChanged', handleChainChanged);
      window.ethereum?.removeListener('accountsChanged', handleAccountsChanged);
    };
  }, []);

  useEffect(() => {
    if (connected) {
      initializeContract();
    }
  }, [connected]);

  const initializeContract = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      const contractInstance = new web3.eth.Contract(
        BlockGradeABI.abi,
        '0xf7109ebbe9e8fdaee66a8806c6645cb0bfe31f71' // Replace with your contract address
      );

      setBlockGradeContract(contractInstance);
    }
  };

  const handleChainChanged = async (chainId) => {
    updateWallet({ chainId });
  };

  const handleAccountsChanged = async (accounts) => {
    updateWallet({ accounts });
    setConnected(true);
  };

  const updateWallet = (newState) => {
    setWallet((prevWallet) => ({ ...prevWallet, ...newState }));
  };

  const handleConnect = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        const chainId = await web3.eth.getChainId();

        updateWallet({ accounts, chainId });
        setConnected(true);
        setCurrentScreen(1);
      } catch (error) {
        console.error('Error connecting to MetaMask:', error.message || error);
        toast({
          variant: "destructive",
          title: "Greksa sa povezivanjem!",
          description: "",
        })

      }
    } else {
      console.error('MetaMask extension not detected');
      toast({
        variant: "destructive",
        title: "Nemate MetaMask instaliran!",
        action: <ToastAction altText="Instaliraj"><a href='https://metamask.io' target="_blank" rel="noopener noreferrer">Instaliraj</a></ToastAction>,
        description: "",
      })
    }
  };

  const handleDisconnect = () => {
    setConnected(false);
    setWallet(initialState);
    setBlockGradeContract(null);
    setCurrentScreen(0);
  };

  const handleAddRow = () => {
    setSubjectRows([...subjectRows, { subject: '', grade: '' }]);
  };

  const handleSubjectChange = (index, value) => {
    const newSubjectRows = [...subjectRows];
    newSubjectRows[index].subject = value;
    setSubjectRows(newSubjectRows);
  };

  const handleGradeChange = (index, value) => {
    const newSubjectRows = [...subjectRows];
    newSubjectRows[index].grade = value;
    setSubjectRows(newSubjectRows);
  };

  const handleDeleteRow = (index) => {
    const newSubjectRows = [...subjectRows];
    newSubjectRows.splice(index, 1);
    setSubjectRows(newSubjectRows);
  };

  const issueCertificate = async () => {
    if (blockGradeContract) {
      try {
        setLoading(true);

        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        const sender = accounts[0];

        const subjectsArray = subjectRows.map((row) => row.subject);
        const gradesArray = subjectRows.map((row) => row.grade);

        const receipt = await blockGradeContract.methods
          .izdajUvjerenje(studentName, description, subjectsArray, gradesArray)
          .send({
            from: sender,
            gasPrice: '25000000',
            gasLimit: '25000'
          });

        const logs = receipt.events.UvjerenjeIzdano.returnValues;
        const certificateId = logs.id.slice(0, -48);
        console.log('Certificate ID:', certificateId);
        setIssuedCertificateId(certificateId);

        setCurrentScreen(2);
      } catch (error) {
        console.error('Error issuing certificate:', error.message || error);
        toast({
          variant: "destructive",
          title: "Molimo vas popunite sve!",
          description: "",
        })
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className={` ${loading ? 'loading' : ''}`}>

      <SimpleHeader>
        <h2 className='text-2xl font-semibold leading-none tracking-tight text-foreground text-center'>Direktor Sučelje</h2>
        <div className="flex justify-center">
          {connected ? (
            <Button size="lg" onClick={handleDisconnect}>Disconnect</Button>
          ) : (
            <Button size="lg" onClick={handleConnect}>Connect MetaMask</Button>
          )}

        </div>
      </SimpleHeader>

      {currentScreen === 1 && connected && (
        <div className='flex justify-center flex-col items-center'>
          <Card className="p-10 m-10 ">
            <CardHeader>
              <CardTitle>

                <h3>Izdaj E-diplomu / E-uvjerenje</h3>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <label htmlFor="studentName">Ime i Prezime:</label>

              <Input
                type="text"
                id="studentName"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}>
              </Input>

              <label htmlFor="description">Opis:</label>
              <Input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}>
              </Input>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Predmet</TableHead>
                    <TableHead>Ocijena</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subjectRows.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell className='p-0'>
                        <Input
                          type="text"
                          value={row.subject}
                          onChange={(e) => handleSubjectChange(index, e.target.value)}>
                        </Input>

                      </TableCell>
                      <TableCell className='py-0'
                      >
                        <Input className=''
                          type="text"
                          value={row.grade}
                          onChange={(e) => handleGradeChange(index, e.target.value)}>
                        </Input>

                      </TableCell>

                      <Button size="icon" variant="destructive"

                        onClick={() => handleDeleteRow(index)}>
                        <X />
                      </Button>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className='flex justify-between'>

              
              <Button onClick={issueCertificate} disabled={loading}>
                {loading ? 'Loading...' : 'Izdaj uvjerenje'}
              </Button>
              <Button className="bg-lime-500 hover:bg-lime-400" onClick={handleAddRow} size="icon">
                <Plus/>
              </Button>
            </CardFooter>


          </Card>
          <p className="font-bold">
            Izdavanje uvjerenja moguće je samo putem ovlaštenih ADRESA! <br></br>
            Svaka ADRESA je povezana s DIREKTOROM (IME, PREZIME, ŠKOLA).
          </p>
        </div>
      )}


      {currentScreen === 2 && connected && issuedCertificateId && (
        <div>
          <h3>Uvjerenje izdano!</h3>
          <p>Link: <a href={`/ediploma?code=${issuedCertificateId.substring(2)}`}>{issuedCertificateId.substring(2)}</a></p>
          <Button onClick={() => window.location.assign("/direktor")}>Direktor Panel</Button>
        </div>
      )}
      <Toaster />
      <SimpleFooter></SimpleFooter>
    </div>
  );
};

export default Direktor;
