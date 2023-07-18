<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>test Audio avec geolocalisation</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div>
    {{ currentAudioName || audioList[fluxAudio].name }}
    <audio-player
      ref="audioPlayer"
      :audio-list="audioList.map(elm => elm.url)"
      aria-controls="play"
    />
  </div>
     <p>
       Nb D'actualisation : {{ cpt }} 
     </p>
     <br>
     <p>
       latitude actuelle : {{ latitude }} 
     </p>
     <br>
     <p>
       longitude actuelle : {{ longitude }}
     </p>
     <br>
     <p>
       distance de Lyon : {{ testLyon }} en kilométres ! Rayon inférieur à {{ rayonlyon  }} km.
     </p>
     <p>
       distance de Vienne : {{ testVienne }} en kilométres ! Rayon inférieur à {{ rayonVienne }} km.
     </p>
     
     <div>
       <audio ref="audioElement" src="audioList.map(elm => elm.url"></audio>

    <svg
    xmlns="http://www.w3.org/2000/svg"
    width="52"
    height="52"
    fill="currentColor"
    class="bi bi-play-circle"
    viewBox="0 0 16 16"
      @click="playAudio"
      v-if="!isPlaying"
    >
    <path
        d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
        />
        <path
        d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"
      />
    </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="52"
      height="52"
      fill="currentColor"
      class="bi bi-pause-circle"
      viewBox="0 0 16 16"
      @click="pauseAudio"
      v-else
      >
      <path
      d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
      />
      <path
      d="M5 6.25a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5zm3.5 0a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5z"
      />
    </svg>
    <button class="btn1" @click="changeAudioSource('https://scdn.nrjaudio.fm/adwz2/fr/30001/mp3_128.mp3?origine=fluxradios')">NRJ</button>
    <button class="btn2" @click="changeAudioSource('http://audio.bfmtv.com/rmcradio_128.mp3')">C.Sao</button>
    <button class="btn3" @click="changeAudioSource('http://icecast.radiofrance.fr/franceinter-hifi.aac')">F I</button>
  </div>
  <div class="imgImg">
    <img class="imgTest" src="../img/img1.jpg" alt="">
    <img class="imgTest" src="../img/img1.jpg" alt="">
    <img class="imgTest" src="../img/img1.jpg" alt="">
<div class="testOpacity"></div>
  </div>
  <ion-content padding>
  <ion-slides [options]="{ slidesPerView: 'auto', zoom: false, grabCursor: true }">
    <ion-slide *ngFor="let card of [0,1,2,3,4,5,6]" style="width: 150px; height: 200px; border: 2px solid #f8f8f8">
      <ion-col>
        <ion-label>Card #{{ card }}</ion-label>
        <ion-img style="pointer-events:none" src="https://via.placeholder.com/150"></ion-img>
      </ion-col>
    </ion-slide>
  </ion-slides>
</ion-content>
</ion-content>
</ion-page>
<ion-page>
  

    <ion-content>
      <audio ref="audioPlayer">
        <source :src="audioSource" type="audio/mpeg">
        Votre navigateur ne supporte pas l'élément audio.
      </audio>

      <ion-button @click="playAudio">Lecture</ion-button>
      <ion-button @click="pauseAudio">Pause</ion-button>
      <ion-button @click="stopAudio">Arrêter</ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { Geolocation } from '@capacitor/geolocation';
import { ref,onBeforeMount, onMounted } from 'vue';
import AudioPlayer from '@liripeng/vue-audio-player';
import { BackgroundMode } from '@ionic-native/background-mode';
import axios from "axios";

const refreshRadio = async () => {
      const res = await axios.get(
        "https://sc1ihlu1696.universe.wf/Appli-Capsao/public/api/api_radios"
      );
      if (res.status !== 200) {
        throw new Error("Problem getting text");
      }
      // console.log('hdhe', res)
      const data = await res.data["hydra:member"];

      console.log(data);



    
      // console.log('ahah', this.radioList)
    };

// const audioSource = 'chemin/vers/le/fichier/audio.mp3';
const audioPlayer = ref();

onMounted(() => {
  audioPlayer.value.addEventListener('ended', () => {
    BackgroundMode.moveToBackground();
  });
});
 refreshRadio();

// const playAudio = () => {
//   audioPlayer.value.play();
// };

// const pauseAudio = () => {
//   audioPlayer.value.pause();
// };

const stopAudio = () => {
  audioPlayer.value.pause();
};

const initializeBackgroundMode = () => {
  BackgroundMode.enable();
};

initializeBackgroundMode();


const isPlaying = ref(false);
const audioElement = ref(null);

const playAudio = () => {
  audioElement.value.play();
  isPlaying.value = true;
};

const pauseAudio = () => {
  audioElement.value.pause();
  isPlaying.value = false;
};

const changeAudioSource = (source) => {
  audioElement.value.src = source;
  audioElement.value.load();
  audioElement.value.play();
  isPlaying.value = true;
};
/*----------------------Variable-------------*/
const min = ref()
const max= ref()
const fluxAudio = ref(0);
const latitude = ref();
const longitude = ref();
const test = ref();
const cpt = ref(0);
const testLyon = ref();
const testVienne = ref();
let currentAudioName = '';
      const audioList = [
        {
          name: 'NRJ Lyon',
          url: 'https://scdn.nrjaudio.fm/adwz2/fr/30001/mp3_128.mp3?origine=fluxradios'
        },
        {
          name: 'CAPSAO Vienne',
          url: 'http://capsaohdf.ice.infomaniak.ch/capsaohdf-128.aac'
        },
        {
          name: 'France inter autre',
          url: 'http://direct.franceinter.fr/live/franceinter-midfi.mp3'
        }
      ];

const rdm = Math.floor(Math.random() * audioList.length);
      let rayonlyon = ref(15); 
      let rayonVienne = ref(7); 
      const calculDist = ref();

// /*--------------------fin variables--------------*/

  


 function generateRandom(min, max) {
        // find diff
         let difference = max - min;
        
         // generate random number
         let rand = Math.random();
        
         // multiply with difference
       rand = Math.floor(rand * difference);

         // add with min value
         rand = rand + min;

         return rand;
 }

// const findAudioList = async () => {
  
// }    
      /*geo loc*/
      
      const printCurrentPosition = async () => {
        
        const coordinates = await Geolocation.getCurrentPosition();
        // latitude.value = coordinates.coords.latitude;
        // longitude.value = coordinates.coords.longitude;
          
          latitude.value =  "4." + generateRandom((min.value = 82710), (max.value = 87329));
          longitude.value = "45." + generateRandom((min.value = 52820), (max.value = 75692));
          console.log(latitude.value);
          console.log(longitude.value);
          cpt.value++
          /*-------------------------------------------------*/
          testVienne.value = getDistance(4.8667 ,45.5167, latitude.value, longitude.value, 'haversine');
          testLyon.value = getDistance(4.850000 ,45.750000, latitude.value, longitude.value, 'haversine');
          calculDist.value = getDistance(45.750000 ,4.850000 ,latitude.value ,longitude.value,'haversine')
          
          
          if (getDistance(4.850000 ,45.750000, latitude.value, longitude.value, 'haversine') < rayonlyon.value) {
            fluxAudio.value = 0
          } else if(getDistance(4.8667 ,45.5167, latitude.value, longitude.value, 'haversine') < rayonVienne.value) {
            fluxAudio.value = 1
          }else {
            fluxAudio.value = 2
          }};
    
          
          
          console.log(
              "45." + generateRandom((min.value = 52820), (max.value = 75692)),
              "longitude"
            );
            console.log(
                "4." + generateRandom((min.value = 82710), (max.value = 87329)),
                "latitude"
              );
              
              onBeforeMount(async()=>{
                await printCurrentPosition();
              })
              /*-----------------------*/
function degToRad(n)
{
    return n * Math.PI / 180;
}

function radToDeg(n)
{
  return n * 180 / Math.PI;
}

function getDistance(lat1, lon1, lat2, lon2, mode)
{    
    var R = 6371; // Earth radius in km
    
    switch(mode)
    {    
        case 'spherical':
        default:
            var dLon = degToRad(lon2 - lon1);
            lat1 = degToRad(lat1);
            lat2 = degToRad(lat2);
            var d = Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(dLon)) * R;
            break;    
            
        case 'haversine':
            var dLat = degToRad(lat2 - lat1);
            var dLon = degToRad(lon2 - lon1);
            lat1 = degToRad(lat1);
            lat2 = degToRad(lat2);
            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2); 
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
            var d = R * c;
        break;    
        
        case 'rectangle':
          var x = degToRad(lon2 - lon1) * Math.cos(degToRad(lat1 + lat2) / 2);
          var y = degToRad(lat2 - lat1);
          var d = Math.sqrt(x * x + y * y) * R;
          break;    
        }
        
    return (d).toFixed(2);    
}




</script>

<style scoped>
button {
  height: 20px;
  width: 50PX;
  background: gray;
  color: black;
  border-radius: 10px;
  margin-right: 10%;
}
svg {
  margin-right: 10%;
}

.imgTest {
  height: 150px;
  width: 150px;
  margin-right: 20px;
  display: flex;
  flex-direction: row;
}
.imgImg {
  display: flex;
  white-space: nowrap;
  overflow: auto;
  opacity:0.2;
  filter:alpha(opacity=90);
  background: blue;
}
</style>