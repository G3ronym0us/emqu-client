<template>
    <v-form 
        v-model="valid"
        ref="form"
        lazy-validation
    >
        <v-container class="mt-6">
            <v-row>
                <v-col
                    cols="12"
                    md="6"
                    offset-md="3"
                >
                    <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="Correo"
                        type="email"
                        required
                    ></v-text-field>

                </v-col>
                <v-col
                    cols="12"
                    md="6"
                    offset-md="3"
                >
                    <v-select
                        v-model="age"
                        :items="ages"
                        label="Edad"
                        required
                    >

                    </v-select>
                </v-col>

                <v-col
                    cols="12"
                    md="6"
                    offset-md="3"
                >
                    <v-select
                        v-model="gender"
                        :items="genders"
                        label="Genero"
                        required
                    >

                    </v-select>
                </v-col>

                <v-col
                    cols="12"
                    md="6"
                    offset-md="3"
                >
                    <v-select
                        v-model="social_network"
                        :items="social_networks"
                        label="Red Social"
                        required
                    >

                    </v-select>
                </v-col>

                <v-col
                    cols="12"
                    md="4"
                    offset-md="3"
                >
                    <v-text-field
                        v-model="facebook_time"
                        :rules="timesRules"
                        label="Tiempo Promedio en Facebook"
                        type="number"
                        required
                    ></v-text-field>

                </v-col>

                <v-col
                    cols="12"
                    md="2"
                >
                    <v-select
                        v-model="facebook_time_aux"
                        :items="times"
                        required
                    >
                    </v-select>
                </v-col>

                <v-col
                    cols="12"
                    md="4"
                    offset-md="3"
                >
                    <v-text-field
                        v-model="whatsapp_time"
                        :rules="timesRules"
                        label="Tiempo Promedio en Whatsapp"
                        type="number"
                        required
                    ></v-text-field>

                </v-col>

                <v-col
                    cols="12"
                    md="2"
                >
                    <v-select
                        v-model="whatsapp_time_aux"
                        :items="times"
                        required
                    >
                    </v-select>
                </v-col>

                <v-col
                    cols="12"
                    md="4"
                    offset-md="3"
                >
                    <v-text-field
                        v-model="twitter_time"
                        :rules="timesRules"
                        label="Tiempo Promedio en Twitter"
                        type="number"
                        required
                    ></v-text-field>

                </v-col>

                <v-col
                    cols="12"
                    md="2"
                >
                    <v-select
                        v-model="twitter_time_aux"
                        :items="times"
                        required
                    >
                    </v-select>
                </v-col>

                <v-col
                    cols="12"
                    md="4"
                    offset-md="3"
                >
                    <v-text-field
                        v-model="instagram_time"
                        :rules="timesRules"
                        label="Tiempo Promedio en Instagram"
                        type="number"
                        required
                    ></v-text-field>

                </v-col>

                <v-col
                    cols="12"
                    md="2"
                >
                    <v-select
                        v-model="instagram_time_aux"
                        :items="times"
                        required
                    >
                    </v-select>
                </v-col>

                <v-col
                    cols="12"
                    md="4"
                    offset-md="3"
                >
                    <v-text-field
                        v-model="tiktok_time"
                        :rules="timesRules"
                        label="Tiempo Promedio en TikTok"
                        type="number"
                        required
                    ></v-text-field>

                </v-col>
                <v-col
                    cols="12"
                    md="2"
                >
                    <v-select
                        v-model="tiktok_time_aux"
                        :items="times"
                        required
                    >
                    </v-select>
                </v-col>
            </v-row>
            <v-row
                class="mb-6 justify-center"
            >
                <v-btn
                    :disabled="!valid"
                    color="success"
                    class="mr-4"
                    @click="validate"
                >
                    Enviar
                </v-btn>
            </v-row>
        </v-container>
    </v-form>
</template>

<script>
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/api'
});

instance.defaults.headers.common['Content-Type'] = 'application/json';
instance.defaults.headers.common['Accept'] = 'application/json';


export default {
    data: () => ({
        email: null,
        age: '18-25',
        gender: 'Female',
        social_network:'Facebook',
        facebook_time: null,
        whatsapp_time: null,
        twitter_time: null,
        instagram_time: null,
        tiktok_time: null,
        facebook_time_aux: 'Minutos',
        whatsapp_time_aux: 'Minutos',
        twitter_time_aux: 'Minutos',
        instagram_time_aux: 'Minutos',
        tiktok_time_aux: 'Minutos',
        valid: true,
        emailRules: [
            v => !!v || 'El correo es requerido',
            v => /.+@.+\..+/.test(v) || 'El correo debe ser valido',
        ],
        timesRules: [
            v => !!v || 'Este campo es requerido',
        ],
        ages: ['18-25','26-33','34-40','40+'],
        genders: ['Female', 'Male'],
        social_networks: ['Facebook','Whatsapp','Twitter','Instagram','TikTok'],
        times: ['Minutos','Horas']
    }),
    methods: {
        validate () {
            if(this.$refs.form.validate()){
                instance.post('questionnaire',{
                    email: this.email,
                    age: this.age,
                    gender: this.gender,
                    social_network: this.social_network,
                    facebook_time: this.facebook_time,
                    whatsapp_time: this.whatsapp_time,
                    twitter_time: this.twitter_time,
                    instagram_time: this.instagram_time,
                    tiktok_time: this.tiktok_time,
                })
                .then((response) => {
                    console.log(response.status);
                    if(response.status == 201){
                        this.$toastr.success('Ha participado correctemente en nuestra encuesta!', 'Exito')
                        this.email = null;
                        this.age= '18-25';
                        this.gender= 'Female';
                        this.social_network='Facebook';
                        this.facebook_time= null;
                        this.whatsapp_time= null;
                        this.twitter_time= null;
                        this.instagram_time= null;
                        this.tiktok_time= null;
                        this.facebook_time_aux= 'Minutos';
                        this.whatsapp_time_aux= 'Minutos';
                        this.twitter_time_aux= 'Minutos';
                        this.instagram_time_aux= 'Minutos';
                        this.tiktok_time_aux= 'Minutos';
                    }
                })
                .catch(function (errors) {
                    console.log(errors);
                });
            }
        }
    }
}
</script>
