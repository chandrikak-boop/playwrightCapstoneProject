import {test,expect} from '@playwright/test';
import {validateSchemaZod} from 'playwright-schema-validator'
import {z} from 'zod';

test('GET',async({request})=>{
    console.log(`Base URL is: ${process.env.BASE_URL_API}`);
    const response=await request.get(`${process.env.BASE_URL_API}`);
    console.log(await response.json());
    await expect(response.status()).toBe(200);
    await expect(response.statusText()).toBe('OK');
    await expect(response.headers()['content-type']).toContain('application/json');
    
});

//---------------------- POST and GET ----------------------------
test('POST',async({request,page})=>{

//Crerate a new object via POST request
const response=await request.post(`${process.env.BASE_URL_API}`,{
        data:{
            "name": "my Apple MacBook Pro 16",
            "data": {
                "year": 2019,
                "price": 1849.99,
                "CPU model": "Intel Core i9",
                "Hard disk size": "1 TB"
            }
        }
    }) 
   const postJson = await response.json();
    //console.log(postJson);

   await expect(response.status()).toBe(200);
    await expect(response.statusText()).toBe('OK');
    let userID = postJson.id;

  // Now perform GET request to retrieve the created object
   let getResponse=await request.get(`${process.env.BASE_URL_API}/${userID}`)
   console.log(await getResponse.json());
   const jsonResponse=await getResponse.json()
    await expect(getResponse.status()).toBe(200);
    await expect(getResponse.statusText()).toBe('OK');
    //defining schema structure
    const schema=z.object({
    id: z.string(),
    name: z.string(),
    data: z.object({
    year: z.number().int().min(1900).max(new Date().getFullYear()), // Validating year as an integer within a reasonable range
    price: z.number().positive(), // Validating price as a positive number
    'CPU model': z.string(),
    'Hard disk size': z.string(),
  })
});
//validating response against schema
await validateSchemaZod({page},jsonResponse,schema)

//Update the object via PUT request
let putResponse=await request.put(`${process.env.BASE_URL_API}/${userID}`,{
    data:{
        "name": "Apple MacBook Pro 16",
   "data": {
      "year": 2019,
      "price": 2049.99,
      "CPU model": "Intel Core i9",
      "Hard disk size": "1 TB",
      "color": "silver"
   }
    }
})
console.log(await putResponse.json());
await expect(putResponse.status()).toBe(200);
await expect(putResponse.statusText()).toBe('OK');

//Patch request to update partial data

    const patchResponse=await request.patch(`${process.env.BASE_URL_API}/${userID}`,
        {
            data:{
            "name": "Apple MacBook Pro 16 (Updated Name)"
            }
        }         
    )
    console.log(await patchResponse.json());
    console.log(await patchResponse.status());
    await expect(patchResponse.status()).toBe(200);
    await expect(patchResponse.statusText()).toBe('OK');

    //delete the object via DELETE request
    const deleteResponse=await request.delete(`https://api.restful-api.dev/objects/${userID}`)
    await expect(deleteResponse.status()).toBe(200);
})
