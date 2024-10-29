const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

const { expect } = chai;
chai.use(chaiHttp);

let token;
let taskId;

describe('Pruebas de API de Tasks', () => {
    
    // Registro de usuario
    it('Debe registrar un nuevo usuario', (done) => {
        chai.request(app)
            .post('/auth/register')
            .send({ username: 'testuser', password: 'testpassword' })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('message', 'Usuario registrado exitosamente');
                done();
            });
    });

    // Inicio de sesión de usuario
    it('Debe iniciar sesión y devolver un token', (done) => {
        chai.request(app)
            .post('/auth/login')
            .send({ username: 'testuser', password: 'testpassword' })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('token');
                token = res.body.token; // Guardamos el token para usarlo en las siguientes pruebas
                done();
            });
    });

    // Crear una tarea
    it('Debe crear una nueva tarea', (done) => {
        const newTask = {
            title: 'Tarea de prueba',
            description: 'Descripción de tarea de prueba'
        };
        chai.request(app)
            .post('/tasks')
            .set('Authorization', `Bearer ${token}`)
            .send(newTask)
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('title', 'Tarea de prueba');
                taskId = res.body._id;
                done();
            });
    });

    // Ver todas las tareas
    it('Debe obtener todas las tareas', (done) => {
        chai.request(app)
            .get('/tasks')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                done();
            });
    });

    // Editar una tarea
    it('Debe editar la tarea creada', (done) => {
        const updatedTask = {
            title: 'Tarea actualizada',
            description: 'Descripción actualizada de tarea'
        };
        chai.request(app)
            .put(`/tasks/${taskId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedTask)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('title', 'Tarea actualizada');
                done();
            });
    });

    // Eliminar una tarea
    it('Debe eliminar la tarea creada', (done) => {
        chai.request(app)
            .delete(`/tasks/${taskId}`)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message', 'Tarea eliminada exitosamente');
                done();
            });
    });
});
