import { test, expect } from '@playwright/test';

let token:string
let userId:string
const email:string='useremail'+Math.floor(Math.random()*1000)+'@gmail.com'
const userPhone:number=9807231000+Math.floor(Math.random()*9000)
test('POST', async ({ request }) => {

  const response = await request.post("https://www.shoppersstack.com/shopping/shoppers", {
    data: {
      city: "Blr",
      country: "Ind",
      email: email,
      firstName: "test",
      gender: "MALE",
      lastName: "user",
      password: "password123",
      phone: userPhone,
      state: "Kar",
      zoneId: "ALPHA",
    },
  });

  const jsonBody = await response.json();
  console.log(jsonBody);
  userId=jsonBody.data.userId

//   // Basic assertions
//   expect(response.ok()).toBeTruthy();
//   expect(Array.isArray(jsonBody.data)).toBe(true);
//   expect(jsonBody.data.length).toBeGreaterThan(0);

//   // Example of using test data if needed
//   expect(data).toHaveProperty('baseurl');
});

test('Get APIToken',async({request})=>{
    const response=await request.post("https://www.shoppersstack.com/shopping/users/login",{
        data:{
            "email": email,
            "password": "password123",
            "role": "SHOPPER"
        }
    })
    const jsonBody=await response.json()
    console.log(jsonBody);
    token=jsonBody.data.jwtToken
})
//    jwtToken: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyNDAwQGdtYWlsLmNvbSBTSE9QUEVSIiwiZXhwIjoxNzY3MzgyNjUzLCJpYXQiOjE3NjczNDY2NTN9.Jp6zVo1eYbphsSNrz36cJGjRV6TDzq-t-5WDJNyPtTY'

test('GET',async({request})=>{
    console.log(`Bearer ${token}`);
    const response=await request.get(`https://www.shoppersstack.com/shopping/shoppers/${userId}`,
        {
            
            headers:{
                'Authorization': `Bearer ${token}`

            }
        }
    );
    console.log(await response.status());
    
})
