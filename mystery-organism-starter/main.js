// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (num, arr) => {
  return {
    specimenNum: num,
    dna: arr,
    mutate() {
      // console.log(`Starting dna is ${this.dna}`);
      
      // Get the 4 bases
      const dnaBases = ['A', 'T', 'C', 'G'];
      
      // Random choose an index of the strand to mutate
      let selectedIndex = Math.floor(Math.random() * 15);
      // console.log(`Selected index to change is ${selectedIndex}`);

      // Get the base at that index
      let selectedBase = this.dna[selectedIndex];
      // console.log(`The base at ${selectedIndex} is ${selectedBase}`);

      // Get an array of the 4 available bases, less the selected base
      const dnaBasesSubset = dnaBases.filter(item => item != selectedBase);
      // console.log(`Available bases to choose from is ${dnaBasesSubset}`);

      // Choose one of the available 3 bases
      const newBase = dnaBasesSubset[Math.floor(Math.random() * 3)];
      // console.log(`The new base to replace with is ${newBase}`);

      // Add that base into the strand
      this.dna[selectedIndex] = newBase;

      return 'New strand is ' + this.dna;
    },
    compareDNA(comparisonStrand){
      let identical = 0;
      for (let i = 0; i < this.dna.length; i++) {

        if (this.dna[i] === comparisonStrand[i]) {
          identical += 1;
        }
      }
      return `Specimen #1 and specimen #2 have ${Math.round(identical / this.dna.length * 100)}% in common`
    },
    willLikelySurvive(){
      const elems = this.dna.filter(val => (val === 'C' || val === 'G'));
      if ((elems.length / 15) * 100 >= 60) {
        return true;
      } else {
        return false;
      }
    },
    complementStrand(){

      complement = [];
      for (base of this.dna) {
        switch(base) {
          case 'A':
            complement.push('T');
            break;
          case 'T':
            complement.push('A');
            break;
          case 'C':
            complement.push('G');
            break;
          case 'G':
            complement.push('C');
            break;
          default:
            console.log('Invalid');
            break;
        }  
      }

      return complement;

    }
  }
}

/////////// Tests

/////////// TEST 1: Check that everything is working as expected
// console.log(pAequor);
// console.log(pAequor.compareDNA(['G','C','T','T','T','A','C','G','G','C','C','A','C','C','C']));
// console.log(pAequor);
// console.log(pAequor.willLikelySurvive());

/////////// TEST 2: Generate 30 specimens
// count = 0;
// specimens = [];
// while (count <= 30){
//   const pAequor = pAequorFactory(count + 1, mockUpStrand());
//   if (pAequor.willLikelySurvive()) {
//     specimens.push(pAequor.dna);
//     count +=1;
//   }
// }

// console.log(specimens);

/////////// TEST 3: Complementary strands
// const pAequor = pAequorFactory(1, mockUpStrand());
// console.log(pAequor);
// console.log(pAequor.complementStrand());