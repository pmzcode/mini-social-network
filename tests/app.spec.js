'use strict'
var app = require("../server");
const request = require("supertest")(app);


const cookies = ['token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJlZ29yQGVnb3IuY29tIiwiaWF0IjoxNDk1NjU2NDc4fQ.ocFAOL8SR19o9le_XCFJaQWsOrW4J53dTcR7HCLQKT4'];



describe('info api tests', () => {

    it('GET api/info/', (done) => {
        return request
            .get('/api/info')
            .set('Cookie', cookies)
            .expect(200)
            .then((res) => {
                if (res.body.error) {
                    throw res.body.error;
                }
                if (res.body.name) {
                    done()
                }
            }).catch((err) => {
                throw err;
            })
    });

    it('GET api/users/1/info', (done) => {
        return request
            .get('/api/users/1/info')
            .set('Cookie', cookies)
            .expect(200)
            .then((res) => {
                if (res.body.error) {
                    throw res.body.error;
                }
                done()
            })
            .catch((err) => {
                throw err;
            })

    });

    var updateData={name:"test",surname:"test",birtdate:"test",location:"test",phone: "test",
        about:"test",status:"test"}

    it('PUT api/info', (done) => {
        return request
            .put('/api/info')
            .set('Cookie', cookies)
            .expect(201)
            .send(updateData)
            .then((res) => {
                if (res.body.error) {
                    throw res.body.error;
                }
                if (res.body.success == true) {
                    done()
                }
            }).catch((err) => {
                throw err;
            })
    });

});


describe('sessions api tests', () => {



    it('GET api/info/', (done) => {
        return request
            .get('/api/info')
            .set('Cookie', cookies)
            .expect(200)
            .then((res) => {
                if (res.body.error) {
                    throw res.body.error;
                }
                if (res.body.name) {
                    done()
                }
            }).catch((err) => {
                throw err;
            })
    });




});


describe('friends api tests', () => {

    it('POST api/friends/2', (done) => {
        return request
            .post('/api/friends/2')
            .set('Cookie', cookies)
            .expect(201)
            .then((res) => {
                if (res.body.error) {
                    throw res.body.error;
                }
                if (res.body.user1_id && res.body.user2_id) {
                    done()
                }
            }).catch((err) => {
                throw err;
            })
    });

    it('GET api/friends/', (done) => {
        return request
            .get('/api/friends')
            .set('Cookie', cookies)
            .expect(200)
            .then((res) => {
                if (res.body.error) {
                    throw res.body.error;
                }
                if (res.body.count && res.body.rows) {
                    done()
                }
            }).catch((err) => {
                throw err;
            })
    });

    it('GET api/users/2/friends', (done) => {
        return request
            .get('/api/users/2/friends')
            .set('Cookie', cookies)
            .expect(200)
            .then((res) => {
                if (res.body.error) {
                    throw res.body.error;
                }
                if (res.body.count && res.body.rows) {
                    done()
                }
            }).catch((err) => {
                throw err;
            })
    });



    it('DELETE api/friends/2', (done) => {
        return request
            .delete('/api/friends/2')
            .set('Cookie', cookies)
            .expect(200)
            .then((res) => {
                if (res.body.error) {
                    throw res.body.error;
                }
                if (res.body.success == true) {
                    done()
                }
            }).catch((err) => {
                throw err;
            })
    });

});


describe('messages api tests', () => {


    it('GET api/messages/', (done) => {
        return request
            .get('/api/messages')
            .set('Cookie', cookies)
            .expect(200)
            .then((res) => {
                if (res.body.error) {
                    throw res.body.error;
                }
                if (res.body.count && res.body.rows) {
                    done()
                }
            }).catch((err) => {
                throw err;
            })
    });

    it('GET api/messages/2', (done) => {
        return request
            .get('/api/messages/2')
            .set('Cookie', cookies)
            .expect(200)
            .then((res) => {
                if (res.body.error) {
                    throw res.body.error;
                }
                if (res.body.count && res.body.rows) {
                    done()
                }
            }).catch((err) => {
                throw err;
            })
    });

    var testMessage = { text:"test text"};

    it('POST api/messages/2', (done) => {
        return request
            .post('/api/messages/2')
            .set('Cookie', cookies)
            .expect(201)
            .send(testMessage)
            .then((res) => {
                console.log(res.body);
                if (res.body.error) {
                    throw res.body.error;
                }
                if (res.body.text) {
                    done()
                }
            }).catch((err) => {
                throw err;
            })
    });
});


describe('dialogs api tests', () => {

    it('GET api/dialogs/2', (done) => {
        return request
            .get('/api/dialogs/2')
            .set('Cookie', cookies)
            .expect(200)
            .then((res) => {
                if (res.body.error) {
                    throw res.body.error;
                }
                if (res.body[0].room) {
                    done()
                }
            }).catch((err) => {
                throw err;
            })
    });




});



describe('posts api tests', () => {

    it('GET api/posts', (done) => {
        return request
            .get('/api/posts')
            .set('Cookie', cookies)
            .expect(200)
            .then((res) => {
                if (res.body.error) {
                    throw res.body.error;
                }
                if (res.body.count && res.body.rows) {
                    done()
                }
            }).catch((err) => {
                throw err;
            })
    });

    it('GET api/users/2/posts', (done) => {
        return request
            .get('/api/posts')
            .set('Cookie', cookies)
            .expect(200)
            .then((res) => {
                if (res.body.error) {
                    throw res.body.error;
                }
                if (res.body.count && res.body.rows) {
                    done()
                }
            }).catch((err) => {
                throw err;
            })
    });

    var testData = {sender: 1, receiver: 1, message: "test_post",date:"test"};
    var Id;

    it('POST api/posts', (done) => {
        return request
            .post('/api/posts')
            .set('Cookie', cookies)
            .expect(201)
            .send(testData)
            .then((res) => {
                console.log(res.body);
                if (res.body.error) {
                    throw res.body.error;
                }
                if (res.body.message) {
                    Id = res.body.id
                    done()
                }
            }).catch((err) => {
                throw err;
            })
    });

    it('DELETE api/posts', (done) => {
        return request
            .delete('/api/posts?post_id='+Id)
            .set('Cookie', cookies)
            .expect(200)
            .then((res) => {
                if (res.body.error) {
                    throw res.body.error;
                }
                if (res.body.success == true) {
                    done()
                }
            }).catch((err) => {
                throw err;
            })
    });
});