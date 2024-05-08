import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signinInput, signupInput } from "blogger_common"

export const userRouter = new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string
    }
}>()

userRouter.post('/signup', async(c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
  const body= await c.req.json();

  const { success } = signupInput.safeParse(body);
	if (!success) {
		c.status(400);
		return c.json({ error: "invalid input" });
	}
  try{
  const user= await prisma.user.create({
    data:{
      email:body.email,
      password:body.password,
      name:body.name
  
    },
  })
  
  const jwt = await sign(
    {
      id: user.id,
    },
    c.env.JWT_SECRET
  );
  
    return c.text(jwt)

  }catch(e){
    c.status(403);
		return c.json({ error: "error while signing up" });
  }
  })


 


  
  userRouter.post('/signin', async(c) => {
    const body= await c.req.json()
 
    const { success } = signinInput.safeParse(body);
    if (!success) {
      c.status(400);
      return c.json({ error: "invalid input" });
    }
  


    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
  

 
  try{

  const user= await prisma.user.findFirst({
    where:{
      email:body.email,
      password:body.password
    }
  })
  
  if(!user){
    c.status(200)
      return c.json({error:"User is not present"})
  }
  
  const jwt= await sign({id:user.id},c.env.JWT_SECRET)
  return c.text(jwt)
}catch(e){
  console.log(e);
    c.status(411);
    return c.text("Invalid");
}
  
  
  })
  