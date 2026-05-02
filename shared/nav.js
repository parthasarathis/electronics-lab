// ══════════════════════════════════════════════════════════════════
// ElecLab — shared/nav.js
// Injected at bottom of every device page.
// 1. Verifies access token (same gate as index.html)
// 2. Injects prev / next navigation bar
// ══════════════════════════════════════════════════════════════════

(function () {
  // ── ACCESS GATE ──────────────────────────────────────────────────
  const TOKEN = 'PDEL_7x9K_2025';
  const isDev = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
  const urlParam = new URLSearchParams(location.search).get('app');

  const hasAccess = isDev || localStorage.getItem('pd_elec_access') === TOKEN || urlParam === TOKEN;
  if (!hasAccess) {
    location.replace('../index.html');
    return;
  }

  const tokenSuffix = urlParam === TOKEN ? '?app=' + TOKEN : '';

  // ── DEVICE NUMBER FROM FILENAME ───────────────────────────────────
  const match = location.pathname.match(/\/(\d+)-/);
  if (!match) return;
  const cur = parseInt(match[1], 10);
  const prev = cur > 1   ? cur - 1 : null;
  const next = cur < 150 ? cur + 1 : null;

  function pad(n) { return String(n).padStart(2, '0'); }

  // ── DEVICE NAMES (abbreviated for nav label) ─────────────────────
  const NAMES = {
    1:'Resistor',2:'Capacitor',3:'Inductor',4:'Transformer',5:'Crystal',
    6:'Fuse',7:'Varistor',8:'Thermistor',9:'LDR',10:'Potentiometer',
    11:'P-N Diode',12:'Zener',13:'Schottky',14:'Tunnel',15:'Varactor',
    16:'PIN Diode',17:'Photodiode',18:'LED',19:'Laser Diode',20:'Avalanche',
    21:'Rectifier',22:'NPN BJT',23:'PNP BJT',24:'N-JFET',25:'P-JFET',
    26:'NMOS',27:'PMOS',28:'Depletion MOS',29:'Darlington',30:'IGBT',
    31:'Photo-BJT',32:'UJT',33:'SCR',34:'TRIAC',35:'DIAC',36:'GTO',
    37:'Power MOS',38:'SiC MOS',39:'GaN',40:'LED Opto',41:'IR LED',
    42:'Photodiode',43:'Photo-BJT',44:'Optocoupler',45:'Solar Cell',
    46:'LCD',47:'OLED',48:'7-Segment',49:'Dot Matrix',50:'CCD Sensor',
    51:'Temp Sensor',52:'Humidity',53:'Pressure',54:'Ultrasonic',
    55:'IR Proximity',56:'Hall Effect',57:'Accelerometer',58:'Gyroscope',
    59:'Magnetometer',60:'Strain Gauge',61:'Load Cell',62:'Gas Sensor',
    63:'PIR',64:'Flex Sensor',65:'Touch Sensor',66:'Color Sensor',
    67:'Current Sensor',68:'Rotary Encoder',69:'Microphone',70:'Piezo Sensor',
    71:'DC Motor',72:'BLDC Motor',73:'Stepper',74:'Servo',75:'Solenoid',
    76:'Relay',77:'SSR',78:'Speaker',79:'Piezo Buzzer',80:'Linear Act.',
    81:'Vibe Motor',82:'Op-Amp',83:'Comparator',84:'555 Timer',
    85:'Volt. Reg.',86:'LDO',87:'InAmp',88:'ADC',89:'DAC',90:'PLL',
    91:'VCO',92:'S&H',93:'Multiplier',94:'Audio Amp',95:'Logic Gates',
    96:'Flip-Flops',97:'Mux/Demux',98:'Enc/Dec',99:'Shift Reg',
    100:'Counter',101:'Schmitt',102:'Latch',103:'Priority Enc',104:'ALU',
    105:'SRAM',106:'DRAM',107:'EEPROM',108:'Flash',109:'ROM',110:'SD Card',
    111:'Arduino',112:'ESP32',113:'STM32',114:'RP2040',115:'PIC',
    116:'AVR',117:'Raspberry Pi',118:'FPGA',119:'CPLD',120:'DSP',
    121:'UART',122:'I²C',123:'SPI',124:'CAN Bus',125:'RS-485',
    126:'Bluetooth',127:'Wi-Fi',128:'NRF24',129:'LoRa',130:'GSM/4G',
    131:'GPS',132:'Zigbee',133:'Bridge Rect.',134:'Boost Conv.',
    135:'Buck Conv.',136:'Buck-Boost',137:'Flyback',138:'H-Bridge',
    139:'Gate Driver',140:'BMS',141:'Supercap',142:'UPS',
    143:'LCD Driver',144:'LED Driver',145:'Servo Driver',146:'Motor Driver',
    147:'Stepper Drv',148:'7-Seg Drv',149:'Key Scanner',150:'Touch Ctrl',
  };

  // FILE MAP (number → filename prefix)
  const FILES = [
    '','01-resistor','02-capacitor','03-inductor','04-transformer','05-crystal',
    '06-fuse','07-varistor','08-thermistor','09-ldr','10-potentiometer',
    '11-pn-diode','12-zener-diode','13-schottky-diode','14-tunnel-diode',
    '15-varactor-diode','16-pin-diode','17-photodiode','18-led','19-laser-diode',
    '20-avalanche-diode','21-rectifier-diode','22-npn-bjt','23-pnp-bjt',
    '24-n-jfet','25-p-jfet','26-nmos-enhancement','27-pmos-enhancement',
    '28-depletion-mosfet','29-darlington','30-igbt','31-phototransistor',
    '32-ujt','33-scr','34-triac','35-diac','36-gto','37-power-mosfet',
    '38-sic-mosfet','39-gan-transistor','40-led-opto','41-ir-led',
    '42-photodiode-opto','43-phototransistor-opto','44-optocoupler',
    '45-solar-cell','46-lcd','47-oled','48-seven-segment','49-dot-matrix',
    '50-ccd-sensor','51-temp-sensor','52-humidity-sensor','53-pressure-sensor',
    '54-ultrasonic-sensor','55-ir-proximity','56-hall-effect','57-accelerometer',
    '58-gyroscope','59-magnetometer','60-strain-gauge','61-load-cell',
    '62-gas-sensor','63-pir-sensor','64-flex-sensor','65-touch-sensor',
    '66-color-sensor','67-current-sensor','68-rotary-encoder','69-microphone',
    '70-piezo-sensor','71-dc-motor','72-bldc-motor','73-stepper-motor',
    '74-servo-motor','75-solenoid','76-relay','77-ssr','78-speaker',
    '79-piezo-buzzer','80-linear-actuator','81-vibration-motor','82-opamp',
    '83-comparator','84-555-timer','85-voltage-regulator','86-ldo-regulator',
    '87-inamp','88-adc','89-dac','90-pll','91-vco','92-sample-hold',
    '93-multiplier-ic','94-audio-amp','95-logic-gates','96-flip-flops',
    '97-mux-demux','98-encoder-decoder','99-shift-register','100-counter-ic',
    '101-schmitt-trigger','102-latch','103-priority-encoder','104-full-adder',
    '105-sram','106-dram','107-eeprom','108-flash-memory','109-rom-eprom',
    '110-sd-card','111-arduino','112-esp32','113-stm32','114-rp2040',
    '115-pic-mcu','116-avr-mcu','117-raspberry-pi','118-fpga','119-cpld',
    '120-dsp','121-uart','122-i2c','123-spi','124-can-bus','125-rs485',
    '126-bluetooth','127-wifi-module','128-nrf24','129-lora','130-gsm-module',
    '131-gps-module','132-zigbee','133-bridge-rectifier','134-boost-converter',
    '135-buck-converter','136-buck-boost','137-flyback-converter','138-h-bridge',
    '139-gate-driver','140-bms','141-supercapacitor','142-ups-module',
    '143-lcd-driver','144-led-driver','145-servo-driver','146-motor-driver',
    '147-stepper-driver','148-seven-seg-driver','149-keyboard-scanner',
    '150-touch-controller',
  ];

  function href(n) { return FILES[n] + '.html' + tokenSuffix; }

  // ── INJECT NAV BAR ────────────────────────────────────────────────
  const nav = document.createElement('div');
  nav.id = 'sidenav';
  nav.style.cssText = [
    'position:fixed','bottom:0','left:0','right:0',
    'display:flex','align-items:center','justify-content:space-between',
    'padding:6px 10px','z-index:100',
    'background:rgba(6,8,15,0.96)',
    'border-top:1px solid #182030',
    'backdrop-filter:blur(8px)',
    '-webkit-backdrop-filter:blur(8px)',
    'gap:6px',
  ].join(';');

  function navBtn(n, dir) {
    if (!n) {
      return `<div style="width:110px"></div>`;
    }
    const arrow = dir === 'prev' ? '←' : '→';
    const label = dir === 'prev' ? `${arrow} #${pad(n)}` : `#${pad(n)} ${arrow}`;
    return `<a href="${href(n)}" style="
      display:flex;flex-direction:column;align-items:${dir==='prev'?'flex-start':'flex-end'};
      text-decoration:none;padding:4px 8px;border-radius:8px;
      border:1px solid #182030;background:rgba(255,255,255,0.02);
      min-width:90px;max-width:130px;
      transition:border-color 0.15s;
      -webkit-tap-highlight-color:transparent;
    " onmouseenter="this.style.borderColor='rgba(139,52,232,0.35)'"
       onmouseleave="this.style.borderColor='#182030'">
      <span style="font-size:7px;letter-spacing:1.5px;color:#5a7090;font-family:'Courier New',monospace;text-transform:uppercase">${label}</span>
      <span style="font-size:9px;color:#8899bb;font-family:'Courier New',monospace;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:120px">${NAMES[n]||''}</span>
    </a>`;
  }

  function homeBtn() {
    return `<a href="../index.html${tokenSuffix}" style="
      display:flex;flex-direction:column;align-items:center;
      text-decoration:none;padding:4px 8px;border-radius:8px;
      border:1px solid rgba(139,52,232,0.2);
      background:rgba(139,52,232,0.07);
      -webkit-tap-highlight-color:transparent;
    ">
      <span style="font-size:10px;color:#8b34e8">⊞</span>
      <span style="font-size:6px;letter-spacing:1.5px;color:#5a7090;font-family:'Courier New',monospace;text-transform:uppercase">${pad(cur)}/150</span>
    </a>`;
  }

  nav.innerHTML = navBtn(prev, 'prev') + homeBtn() + navBtn(next, 'next');
  document.body.appendChild(nav);
})();
