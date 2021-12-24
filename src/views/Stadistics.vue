<template>

    <v-container>
            <v-row>
                <v-col
                    cols="12"
                    md="4"
                >
                    <v-card
                    class="ma-3"
                    color="#385F73"
                    dark
                >
                    <v-card-title>
                        <span>Encuentas Respondidas</span>
                    </v-card-title>

                    <v-card-text class="text-center">
                        <h2>{{ questionnaires_answered }}</h2>
                    </v-card-text>

                    
                </v-card>
                </v-col>

                <v-col
                    cols="12"
                    md="4"
                    v-for="(average ,social_network, index) in averages_social_network"
                    :key="index"
                >
                    <v-card
                    class="ma-3"
                    color="#FFCCBC"
                    dark
                >
                    <v-card-title>
                        <span>Tiempo Promedio en {{ social_network }}</span>
                    </v-card-title>

                    <v-card-text class="text-center">
                        <h2>{{ average }}</h2>
                    </v-card-text>

                    
                </v-card>
                </v-col>

                <v-col
                    cols="12"
                    md="4"
                >
                    <v-card
                    class="ma-3"
                    color="#00E676"
                    dark
                >
                    <v-card-title>
                        <span>Red Social Favorita</span>
                    </v-card-title>

                    <v-card-text class="text-center">
                        <h2>{{ favorite }} ({{ favorite_total }})</h2>
                    </v-card-text>

                    
                </v-card>
                </v-col>

                <v-col
                    cols="12"
                    md="4"
                >
                    <v-card
                    class="ma-3"
                    color="#FF1744"
                    dark
                >
                    <v-card-title>
                        <span>Red Social Menos Querida</span>
                    </v-card-title>

                    <v-card-text class="text-center">
                        <h2>{{ n_favorite }} ({{ n_favorite_total }})</h2>
                    </v-card-text>

                    
                </v-card>
                </v-col>

                <v-col
                    cols="12"
                    md="4"
                    v-for="sn in range_use"
                    :key="sn.social_network"
                >
                    <v-card
                    class="ma-3"
                    color="#009688"
                    dark
                >
                    <v-card-title>
                        <span>¿Quien usa mas {{ sn.social_network }}?</span>
                    </v-card-title>

                    <v-card-text class="text-center">
                        <h2>{{ sn.age }}</h2>
                    </v-card-text>

                    
                </v-card>
                </v-col>
            </v-row>
            <v-row>
            </v-row>
    </v-container>

    
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
        questionnaires_answered: 0,
        averages_social_network: {},
        range_use:{},
        favorite: null,
        favorite_total: 0,
        n_favorite: null,
        n_favorite_total: 0
    }),
    mounted(){
        this.getQuestionnairesAnswered();
        this.getAverageSocialNetwork();
        this.getSocialNetworkFavorite();
        this.getSocialNetworkNotFavorite();
        this.getUseForAge();
    },
    methods:{
        getQuestionnairesAnswered(){
            instance.get('/questionnaires_answered').then( (response) => {
                this.questionnaires_answered = response.data;
            })
        },
        getAverageSocialNetwork(){
            instance.get('/time_average_social_network').then( (response) => {
                this.averages_social_network = response.data
            })
        },
        getSocialNetworkFavorite(){
            instance.get('/get_favorite_sn').then( (response) => {
                this.favorite = response.data.social_network;
                this.favorite_total = response.data.total;
            })
        },
        getSocialNetworkNotFavorite(){
            instance.get('/get_not_favorite_sn').then( (response) => {
                this.n_favorite = response.data.social_network;
                this.n_favorite_total = response.data.total;
            })
        },
        getUseForAge(){
            instance.get('/get_use_for_age').then( (response) => {
                this.range_use = response.data;
            })
        }
    }
}
</script>
