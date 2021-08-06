export const sortData = (data) => {     //sort data from biggest to smallest
    const sortedData = [...data];

   return sortedData.sort((a,b) => a.cases > b.cases ? -1 : 1)  //sort function 
}