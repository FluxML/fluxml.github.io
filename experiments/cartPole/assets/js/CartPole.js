(function(obj){

Object.assign(obj, {CartPole})

// cartPole env
function CartPole(render, model)
{
	// ported from https://github.com/JuliaML/Reinforce.jl/blob/master/src/envs/cartpole.jl
	const gravity = 9.8;
	const mass_cart = 1.0;
	const mass_pole = 0.1;
	const total_mass = mass_cart + mass_pole;
	const pole_length = 0.5;
	const mass_pole_length = mass_pole * pole_length;
	const force_mag = 10.0;
	const tau = 0.02 ;

	const theta_threshold = 24* Math.PI / 360
	const x_threshold = 2.4

	//display settings
	const cart_length = .4
	const cart_height = .05
	const pole_diameter = 0.02

	var total_reward = 0;
	var state = {x: 0, xvel: 0, theta: 0, thetavel: 0};
	var action = 0;
	var play = false;

	this.setState = (s)=>{
		state = s;
	}

	this.reset = ()=>{
		state = {x:0, theta: 0, xvel:0, thetavel: 0}
		total_reward = 0;
		play = false;
	}
	
	// self play
	this.start = ()=>{
		this.reset();
		this.display();

		play = true;
		this.next();
	}

	this.next = ()=>{
		if(!play)return;

		({ x, xvel , theta, thetavel } = state);
		var output = model(dl.tensor([x, xvel, theta, thetavel]));
		output.data().then((a)=>{
			action = a[0] > a[1]? 1 : 2;
			this.step(action);
			this.display();
			
			if(!this.done()){
				setTimeout(this.next, 100)
			}
		})
	}

	this.getState = () => state;


	this.step = (a)=>{
		if(this.done()){
			return 0;
		}

		action = a;
		({ x, xvel , theta, thetavel } = state);
		
		force = (action == 1 ? -1 : (a==2)?1:0) * force_mag; // extra action 0 for the case when user doesn't press any key
		tmp = (force + mass_pole_length * Math.sin(theta) * (thetavel^2)) / total_mass
		thetaacc = (gravity * Math.sin(theta) - tmp * Math.cos(theta)) / (pole_length * (4/3 - mass_pole * (Math.cos(theta)^2) / total_mass))
		xacc = tmp - mass_pole_length * thetaacc * Math.cos(theta) / total_mass;
		state.x = (x  	+= tau * xvel)
		state.xvel = (xvel += tau * xacc)
		state.theta = (theta    += tau * thetavel)
		state.thetavel = (thetavel += tau * thetaacc);

		var reward = this.done() || a == 0? 0.0 : 1.0;
		total_reward += reward;
		return reward
	}

	this.done = ()=>{
		({x, xvel , theta, thetavel } = state);
		return !(Math.abs(x) <= x_threshold && Math.abs(theta) <= theta_threshold);
	}

	this.display = ()=>{
		var done = this.done();
		var config = {
			state,
			action, 
			score: total_reward, 
			cart_height, 
			cart_length, 
			pole_length, 
			pole_diameter, 
			x_threshold,
			done
		};
		
		render(config);
	}

	
}

})(window)