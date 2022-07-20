const G = 0.01;
const P = 0.01;
const COLLAPSE_LENGTH = 3;

const canvas = new Canvas();

let particles = [];
for (let i = 0; i < 100; i++) {
    particles.push(new Particle({
        x: getRandomBetween(0, canvas.view.width),
        y: getRandomBetween(0, canvas.view.height),
        mass: getRandomBetween(1, 10)
    }))
}


canvas.add(...particles);

document.body.append(canvas.view);

requestAnimationFrame(tick);

function tick() {
    requestAnimationFrame(tick);



    for (const particle of particles) {
        particle.forces = [];
    }

    for (let i = 0; i < particles.length - 1; i++) {

        const ctrlParticle = particles[i];

        for (j = i + 1; j < particles.length; j++) {
            const currentParticle = particles[j];

            const force = Vector.getDiff(ctrlParticle.position, currentParticle.position);
            const forceNumber = (G * ctrlParticle.mass * currentParticle.mass) / Math.max(force.length ** 2, 0.00001);

            force.mult(forceNumber);

            ctrlParticle.forces.push(force.getNegative());
            currentParticle.forces.push(force);
        }
    }

    for (const particle of particles) {
        const force = particle.force;
        particle.acceleration = new Vector(
            force.x / particle.mass,
            force.y / particle.mass
        );
    }

    for (const particle of particles) {
        particle.speed.add(particle.acceleration);
        particle.position.add(particle.speed);
    }

    canvas.clear();
    canvas.draw();
}