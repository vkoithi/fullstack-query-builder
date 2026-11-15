import express, { Request, Response } from "express"

const app = express()
app.use(express.json())

const courses = [
  {
    id: 1,
    name: "JavaScript"
  },
  {
    id: 2,
    name: "TypeScript"
  }
]

let nextId = 3

app.get("/", async (request: Request, response: Response) => {
  response.json({ message: "Hello World!" })
})

app.get("/courses", (request: Request, response: Response) => {
  response.json(courses)
})

app.get("/courses/:id", (request: Request, response: Response) => { 
  const id = Number(request.params.id)

  const course = courses.find((item) => {
    return id === item.id
  })

  if (course === undefined) {
    return response.status(404).json({
      message: "Curso não encontrado"
    })
  }

  response.json(course)
})

app.post("/courses", (request: Request, response: Response) => {
  const courseName = request.body.name
  
   if (typeof courseName !== "string" || courseName.trim() === "") {
    return response.status(400).json({
      message: "Adicione um curso válido"  
    })
  }
  const newCourse = {
    id: nextId, 
    name: courseName
  }

  courses.push(newCourse)

  nextId = nextId + 1

  response.status(201).json({
    message: "Curso adicionado com sucesso",
    course: newCourse
  })
})

app.delete("/courses/:id", (request: Request, response: Response) => {
  const id = Number(request.params.id)

  const index = courses.findIndex((item) => {
    return id === item.id
  })

  if (index === -1) {
    return response.status(404).json({
      message: "Curso não encontrado"
    })
  }

  courses.splice(index, 1)

  response.status(200).json({
    message: "Curso removido com sucesso"
  })
})

app.listen(3333, () => console.log(`Server is running on port 3333`))
