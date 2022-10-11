<template>
<div class="fundo">


    <pre class="logo">
  .';cc:;.      .,::::::::::'   ':::::::::::,  .::'   .,:;.      .;:.
  .c0NMMMMWXx,    ,KMMMMMMMMMMO. .kMMMMMMMMMMM0' dMMk.  ,KMMO'     oMMx.
 .dWMXdc:lOWMK;   ,KMWk:::::::,  .kMMO:;;;;;;;,  oMMk.  ,KMMWO.    oMMx.
 ;XMNc    .x00l   ,KMNc          .kMMd           oMMk.  ,KMMMWk.   oMMd.
 :NMX;      ..    ,KMNc          .kMMo           oMMO.  ,KMX0XWx.  oMMx.
 :NMK,  .;::;;,   ,KMW0dddddd;   .kMM0lllllll;   oMMO.  ,KMK:lNWd. oMMd.
 :NMK,  oMMMMM0'  ,KMMWXXXXXXd.  .kMMWNNNNNNNx.  oMMO.  ,KMK;.oNWo.oMMd 
 :NMK,  .::kWM0'  ,KMWo.......   .kMMk,''''''.   oMMO.  ,KMK, .oWNdxWMd.
 :NMX;     lWMO'  ,KMNc          .kMMd           oMMO.  ,KMK,  .dWWNWMd 
 '0MWk,...:KMWd.  ,KMWl.......   .kMMd           oMMk.  ,KMK,   .dWMMMd.
  ,OWMNKKXWMNx.   ,KMWNKKKKKKKd. .kMMd           oMMk.  ,KMK,    .xWMMd.
   .;oxkkkdl'     .lddddddddddc. .:dd;           ;ddc.  .ldl.     .ldd; 
    </pre>
</div>
</template>

<style scoped>
    .fundo{
        background-color: black;
        position: fixed;
        width: 100%;
        margin-top: -50mm;
        height: 50mm;
        z-index: -5;
    }
    .logo{
        color:lime;
        align-content:center;
        font-size: 2mm;
        font-weight: bolder;
        user-select: none;
        margin-left:auto;
        margin-right:auto;
        width: fit-content;
        margin-top:4em;
        animation: blink 1s infinite cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    @keyframes blink{
        0%{
            color: #7fff00;
        }
        25%{
            color:rgba(0,125,0,1);
            transform: rotate3d(0,1,0,11deg);
        }
        50%{
            color: #7fff00;
        }
    }
</style>
