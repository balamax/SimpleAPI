const fs = require('fs')
const csv = require('csv-parser')

const datatransformationProcess = {
    async createPermutation (request, res) {
        try{
            const props = {
                array1:[],
                array2:[]
            };
            function generateUsername(firstname, surname) {
            return `${firstname[0]}-${surname}`.toLowerCase();
            }
            fs.createReadStream('input_1.csv')
            .pipe(csv())
            .on('data', function (row) {
                //const username = generateUsername(row.Firstname, row.Surname);
                props.array1.push(row.source1);
                props.array2.push(row.source2);
            })
            .on('end', function () {
                //console.log(props.array1)
                //console.log(props.array2)
                let combos = [];
                for(var i = 0; i < props.array1.length; i++)
                {
                    for(var j = 0; j < props.array2.length; j++)
                    {
                        if(props.array2[j] == ''){
                            continue;
                        }
                        //you would access the element of the array as array1[i] and array2[j]
                        //create and array with as many elements as the number of arrays you are to combine
                        //add them in
                        //you could have as many dimensions as you need
                        let line = {
                            row1: props.array1[i],
                            row2: props.array2[j]
                        }
                        combos.push(line)
                    }
                }
                //console.log(combos)
                // TODO: SAVE users data to another file
                
                const header = ["source1, source2"];
                writeToCSVFile(header, combos);
            })
            res.send({success:true});
        
        } catch (err) {
            console.log(err.type);
            console.log(err.message);
            res.send(err);
        }
    },

    
    async generateListItems (request, res) {
        try{
            const result = [];
            
            function generateListItem(prop, value) {
                return `${prop}.add("${value}");`.toLowerCase();
            }

            fs.createReadStream('listitem.csv')
            .pipe(csv())
            .on('data', function (row) {
                //const username = generateListItem(row.Firstname, row.Surname);
                let line = {
                    row1: generateListItem('woid', row.listitem),
                    row2: ''
                }
                result.push(line);
            })
            .on('end', function () {
                console.table(result);
                const header = ["Values"];
                writeToCSVFile(header, result);
            })
            res.send({success:true});
        
        } catch (err) {
            console.log(err.type);
            console.log(err.message);
            res.send(err);
        }
    }
}

module.exports = datatransformationProcess;

function writeToCSVFile(header, users) {
    const filename = 'output.csv';
    
    fs.writeFile(filename, extractAsCSV(header, users), err => {
        if (err) {
        console.log('Error writing to csv file', err);
        } else {
        console.log(`saved as ${filename}`);
        }
    });
}

function extractAsCSV(header, records) {
    const rows = records.map(record =>
        `${record.row1}, ${record.row2}`
    );
    return header.concat(rows).join("\n");
}