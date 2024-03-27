import { ethers, JsonRpcProvider } from 'ethers';
import BlockGradeABI from '../../BlockGrade.json';

const getCertificates = async (provider, id) => {
      const blockGradeContract = new ethers.Contract(
        '0xf7109ebbe9e8fdaee66a8806c6645cb0bfe31f71',
        BlockGradeABI.abi,
        provider
      );
      const Certificate = await blockGradeContract.dohvatiUvjerenje('0x' + id);
      console.log(Certificate, '0x' + id);
      return Certificate;
  };

  export { getCertificates };