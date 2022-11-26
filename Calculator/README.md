<h1>Simple calculator using React Native</h1>


<h2>1. Open terminal to run docker and clone repo</h2>
    
    >   wsl
    
    >   docker run -u $(id -u) -it --rm --name calculator -p 19000-19010:19000-19010 -v `pwd`:/current node:16.18.0 bash
    
    >   cd current
 
    >   git clone https://github.com/ptatien0307/CS526.N11.KHCL.git

    >   cd CS526.N11.KHCL/Calculator

<img src="https://user-images.githubusercontent.com/79583501/196730719-a5c5e525-eade-4732-9402-43462ad6ef39.png" style="display: block;margin-left: auto;margin-right: auto;"/>

<h2>2. Install node_module by this command</h2>

    > npm install
<img src="https://user-images.githubusercontent.com/79583501/196731161-29f79794-32f6-4f28-889e-fce2e80cf7ea.png" style="display: block;margin-left: auto;margin-right: auto;"/>

<h2>3. Run app  </h2>
    <h3>3.1. To run this calculator on web use commands</h3>
    
    > npm start

    > press w

    > Then, open this link on browser http://localhost:19006
<img src="https://user-images.githubusercontent.com/79583501/196731578-e727c74c-576f-47f9-9402-1212e9bdf34b.png" style="display: block;margin-left: auto;margin-right: auto;"/>
    <h3> 3.2. To run this calculator on mobile (make sure that your mobile and laptop have to connect same private wifi)</h3>
    
    >   npm start
    
    >   Then, open ExpoGo on your mobile to Scan QR code or Enter URL to open app





<img src="https://user-images.githubusercontent.com/79583501/196729099-a03027c7-8d58-49b2-a596-236fb812d45b.png" style="display: block;margin-left: auto;margin-right: auto;width: 50%; height:50%;"/>
