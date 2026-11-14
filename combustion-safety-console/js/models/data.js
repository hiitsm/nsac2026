/* MODEL: seed data and constants. */
/* Real investigations (wording from the challenge brief). Numeric runs are empty until loaded from PSI or a CSV.
   "—" means not recorded, never zero. Demo records below are synthetic and tagged. */
const SRC="NASA PSI database (record link to be added)";
const mk=o=>({runs:[],src:SRC,vary:"see PSI",sens:"see PSI",grav:"Microgravity",h:[],...o});
const DATA=[
mk({id:"CFI-G",title:"Cool Flames Investigation with Gases",type:"Flame behavior",mat:"Gaseous fuel (e.g. propane)",hw:"ACME modules in the Combustion Integrated Rack (CIR)",omax:85,desc:"Flames fed by an oxygen-nitrogen mixture of up to 85% oxygen flowing from a spherical burner, which makes the flame burn inside out.",find:"Holds the highest oxygen concentrations in the database, the closest match to oxygen-rich Moon-base air (30% or more at 10.2 psi or less).",h:["moon","rover","mars"]}),
mk({id:"E-FIELD",title:"Electric-Field Effects on Laminar Diffusion Flames",type:"Flame behavior",mat:"Gaseous fuel",hw:"ACME modules in the CIR",desc:"Electric fields act on the ions in flames, which mimics the effect of partial gravity.",find:"The closest analogue to partial gravity. PSI holds no true partial-gravity data yet.",h:["moon","mars"]}),
mk({id:"BRE",title:"Burning Rate Emulator",type:"Material flammability",mat:"Gaseous fuel emulating solids",hw:"ACME modules in the CIR",desc:"A study of materials flammability in still atmospheres as a function of material properties, although it burned gaseous fuels.",find:"Speaks directly to how flammable materials are in the still air of a habitat.",h:["iss","craft","moon","mars","rover"]}),
mk({id:"FLEX / FLEX-2",title:"Droplet flame experiments",type:"Droplet combustion",mat:"Liquid fuel droplets",hw:"Multi-user Droplet Combustion Apparatus (MDCA) in the CIR",desc:"Burning droplets of liquid fuel, observed to see how the flames behave.",find:"Droplet flames feed models of liquid-fuel fire.",h:["iss","craft"]}),
mk({id:"CFI",title:"Cool Flames Investigation",type:"Droplet combustion",mat:"Liquid fuel droplets",hw:"MDCA in the CIR",desc:"Burning droplets of liquid fuel in the cool-flame regime.",find:"Cool-flame data for modeling liquid-fuel combustion.",h:["iss"]}),
mk({id:"BASS / BASS-II",title:"Solid-fuel burning in the glovebox",type:"Solid-fuel combustion",mat:"Solid fuels",hw:"Microgravity Science Glovebox (MSG), SPICE flow duct",desc:"Solid fuels burned in a fan-driven flow.",find:"How solid materials burn is central to habitat fire safety.",h:["iss","craft","moon","mars","rover"]}),
mk({id:"SPICE",title:"Smoke Point In Co-flow Experiment",type:"Smoke point",mat:"Gaseous fuel",hw:"MSG, SPICE flow duct",desc:"Finds the point at which a flame starts to emit smoke.",find:"Smoke output links flame conditions to detector design.",h:["iss","craft"]}),
mk({id:"SLICE",title:"Structure & Liftoff In Combustion Experiment",type:"Flame behavior",mat:"Gaseous fuel",hw:"MSG, SPICE flow duct",desc:"Flame structure and liftoff.",find:"Flame structure data supports predictive models.",h:["moon","mars"]}),
mk({id:"SAME / SAME-R",title:"Smoke detection instruments",type:"Smoke detection",mat:"—",hw:"Smoke detection instruments",desc:"Smoke instruments tested in microgravity.",find:"Detector performance sets how early a crew gets warning.",h:["iss","craft","rover"]}),
mk({id:"DAFT / DAFT-2",title:"Dust and Aerosol Measurement Feasibility Test",type:"Dust detection",mat:"Dust",hw:"An instrument reused from SAME and SAME-R",desc:"Checks whether a smoke instrument can detect dust instead.",find:"Dust is a concern on lunar and Martian surfaces.",h:["moon","mars"]})
];
const D=(o,runs)=>mk({demo:true,src:"Synthetic demonstration data",runs,desc:"Synthetic records for trying the charts. Not NASA data.",find:"None. Demonstration only.",...o});
const DEMO=[
D({id:"INV-001",title:"Flame Spread Study",type:"Flame spread",mat:"Cotton",hw:"Demo"},[{o2:21,p:101.3,sp:.6},{o2:30,p:101.3,sp:1.4},{o2:40,p:101.3,sp:2.5}]),
D({id:"INV-002",title:"Ignition Study",type:"Ignition",mat:"Polymer",hw:"Demo"},[{o2:21,p:101.3,ig:12},{o2:30,p:101.3,ig:7}]),
D({id:"INV-003",title:"Extinction Study",type:"Extinction",mat:"Paper",hw:"Demo"},[{o2:21,p:101.3,ex:15},{o2:30,p:70.3,ex:13}]),
D({id:"INV-004",title:"Flame Spread Study, normal gravity",type:"Flame spread",mat:"Cotton",grav:"Earth",hw:"Demo"},[{o2:21,p:101.3,sp:1.9},{o2:30,p:101.3,sp:3.1}])
];
const ENV={iss:["Space station (ISS)",21,101.3,"Microgravity"],craft:["Spacecraft cabin",21,101.3,"Microgravity"],moon:["Moon base",30,70.3,"Lunar"],mars:["Mars base",30,70.3,"Martian"],rover:["Pressurized rover",30,70.3,"Lunar"]};
const GR=["Microgravity","Lunar","Martian","Earth"];
const MET={sp:["Flame spread rate","mm/s"],ig:["Ignition delay","s"],ex:["Extinction limit","% O₂"]};
