/* ============================================================
   ATLAS — Course content library
   ------------------------------------------------------------
   HOW TO ADD CONTENT (no build step, just edit this file):
   - A course = { id, title, icon, color, blurb, modules:[...] }
   - A module = { id, title, lessons:[...] }
   - A lesson = {
       id, title, minutes,
       content: "HTML string. Use $inline$ and $$display$$ for math (KaTeX).",
       mcq:        [ { q, choices:[...], answer:<index>, explain } ],
       flashcards: [ { front, back } ],
       homework:   [ { prompt, hint, solution } ]
     }
   Every field except id/title is optional — partial lessons are fine.
   ============================================================ */

window.COURSES = [

/* ============================== LINEAR ALGEBRA ============================== */
{
  id: "linear-algebra",
  title: "Linear Algebra",
  icon: "∑",
  color: "#e0a458",
  blurb: "Vectors, matrices, and the geometry of linear maps — the language underneath all of ML.",
  modules: [
    {
      id: "la-m1",
      title: "Vectors & Spaces",
      lessons: [
        {
          id: "la-vectors",
          title: "What is a Vector?",
          minutes: 12,
          content: `
<h3>Three views of a vector</h3>
<p>A <strong>vector</strong> can be read three ways, and switching between them fluently is most of the skill in linear algebra:</p>
<ul>
  <li><strong>Physics view</strong> — an arrow in space with a length and direction. Where it starts doesn't matter, only its displacement.</li>
  <li><strong>CS / data view</strong> — an ordered list of numbers, e.g. a house described by <code>[area, bedrooms, price]</code>.</li>
  <li><strong>Math view</strong> — anything you can add together and scale by numbers, while obeying a short list of axioms.</li>
</ul>
<p>We write a vector in $\\mathbb{R}^n$ as a column:</p>
$$ \\mathbf{v} = \\begin{bmatrix} v_1 \\\\ v_2 \\\\ \\vdots \\\\ v_n \\end{bmatrix} $$
<h4>The two fundamental operations</h4>
<p>Everything is built from <strong>addition</strong> and <strong>scalar multiplication</strong>:</p>
$$ \\mathbf{u} + \\mathbf{v} = \\begin{bmatrix} u_1+v_1 \\\\ u_2+v_2 \\end{bmatrix}, \\qquad c\\,\\mathbf{v} = \\begin{bmatrix} c\\,v_1 \\\\ c\\,v_2 \\end{bmatrix} $$
<div class="callout"><div class="c-tag">Intuition</div>
Addition = walk along the first arrow, then the second (tip-to-tail). Scaling = stretch or flip an arrow without rotating it (unless the scalar is negative).</div>
<h4>Linear combinations</h4>
<p>Mix vectors with scalar weights and you get a <strong>linear combination</strong>:</p>
$$ c_1\\mathbf{v}_1 + c_2\\mathbf{v}_2 + \\dots + c_k\\mathbf{v}_k $$
<p>This single idea — "scale and add" — is the seed for spans, bases, matrix multiplication, and ultimately neural networks.</p>
<div class="callout sage"><div class="c-tag">Why it matters for ML</div>
A layer of a neural net computes weighted sums of its inputs — a linear combination — then bends the result with a nonlinearity. The "linear" half is exactly this.</div>`,
          mcq: [
            {
              q: "Which of these is NOT one of the two fundamental vector operations?",
              choices: ["Adding two vectors", "Multiplying a vector by a scalar", "Multiplying two vectors component-wise", "(both A and B are fundamental)"],
              answer: 2,
              explain: "Component-wise multiplication (the Hadamard product) exists but is NOT part of the vector-space definition. Only addition and scalar multiplication are fundamental."
            },
            {
              q: "A 'linear combination' of vectors means…",
              choices: ["Scaling each vector and summing the results", "Taking the longest of the vectors", "Rotating one vector onto another", "Comparing their lengths"],
              answer: 0,
              explain: "Linear combination = scale each vector by some scalar, then add them all together. That's the whole concept."
            }
          ],
          flashcards: [
            { front: "Two fundamental operations on vectors?", back: "Vector addition and scalar multiplication. Everything else is built from these." },
            { front: "What is a linear combination of $\\mathbf{v}_1,\\dots,\\mathbf{v}_k$?", back: "$c_1\\mathbf{v}_1 + \\dots + c_k\\mathbf{v}_k$ for scalars $c_i$ — scale and add." },
            { front: "Geometric meaning of vector addition?", back: "Tip-to-tail: place the second arrow's tail at the first arrow's tip; the sum runs from start to final tip." }
          ],
          homework: [
            { prompt: "Compute $2\\begin{bmatrix}1\\\\3\\end{bmatrix} - \\begin{bmatrix}4\\\\1\\end{bmatrix}$.", hint: "Scale first, then subtract component-wise.", solution: "$\\begin{bmatrix}2\\\\6\\end{bmatrix} - \\begin{bmatrix}4\\\\1\\end{bmatrix} = \\begin{bmatrix}-2\\\\5\\end{bmatrix}$." },
            { prompt: "Express $\\begin{bmatrix}5\\\\1\\end{bmatrix}$ as a linear combination of $\\begin{bmatrix}1\\\\1\\end{bmatrix}$ and $\\begin{bmatrix}1\\\\0\\end{bmatrix}$.", hint: "Let $a\\begin{bmatrix}1\\\\1\\end{bmatrix}+b\\begin{bmatrix}1\\\\0\\end{bmatrix}$ and match each component.", solution: "From the 2nd component $a=1$; from the 1st $a+b=5\\Rightarrow b=4$. So $1\\cdot\\begin{bmatrix}1\\\\1\\end{bmatrix}+4\\cdot\\begin{bmatrix}1\\\\0\\end{bmatrix}$." }
          ]
        },
        {
          id: "la-span",
          title: "Span, Linear Independence & Basis",
          minutes: 15,
          content: `
<h3>Span: everywhere you can reach</h3>
<p>The <strong>span</strong> of a set of vectors is the set of <em>all</em> their linear combinations — every point you can reach by scaling and adding them.</p>
<ul>
  <li>Span of one nonzero vector = a <strong>line</strong> through the origin.</li>
  <li>Span of two non-parallel vectors in $\\mathbb{R}^2$ = the <strong>whole plane</strong>.</li>
  <li>Two <em>parallel</em> vectors still only span a line — the second adds nothing new.</li>
</ul>
<h4>Linear independence</h4>
<p>Vectors are <strong>linearly independent</strong> when none of them is a linear combination of the others — each one points in a "genuinely new" direction. Formally, the only way to get zero is the trivial way:</p>
$$ c_1\\mathbf{v}_1 + \\dots + c_k\\mathbf{v}_k = \\mathbf{0} \\;\\Longrightarrow\\; c_1=\\dots=c_k=0 $$
<div class="callout"><div class="c-tag">Test</div>
If you can write one vector using the others, the set is <strong>dependent</strong> (redundant). If you can't, it's <strong>independent</strong>.</div>
<h4>Basis = independent + spanning</h4>
<p>A <strong>basis</strong> is a minimal set of vectors that spans the space: independent (no waste) and spanning (reaches everything). The number of vectors in any basis is the <strong>dimension</strong>.</p>
$$ \\text{Standard basis of }\\mathbb{R}^3:\\quad \\mathbf{e}_1=\\begin{bmatrix}1\\\\0\\\\0\\end{bmatrix},\\ \\mathbf{e}_2=\\begin{bmatrix}0\\\\1\\\\0\\end{bmatrix},\\ \\mathbf{e}_3=\\begin{bmatrix}0\\\\0\\\\1\\end{bmatrix} $$
<div class="callout violet"><div class="c-tag">Big picture</div>
A basis is a coordinate system. Choosing a good basis (e.g. via PCA or eigenvectors) is often the entire trick to making a hard problem easy.</div>`,
          mcq: [
            {
              q: "Two parallel (non-zero) vectors in $\\mathbb{R}^2$ span…",
              choices: ["The whole plane", "A line through the origin", "A single point", "All of $\\mathbb{R}^3$"],
              answer: 1,
              explain: "Parallel vectors point the same/opposite direction, so every combination stays on one line — the second vector adds no new direction."
            },
            {
              q: "A basis of a vector space must be…",
              choices: ["Spanning but may be dependent", "Independent but need not span", "Both independent AND spanning", "Orthogonal and unit length"],
              answer: 2,
              explain: "A basis is exactly an independent spanning set. Orthogonality/unit length is a nicety (orthonormal basis), not required."
            }
          ],
          flashcards: [
            { front: "Define the span of a set of vectors.", back: "The set of ALL linear combinations of them — every point reachable by scaling and adding." },
            { front: "When are vectors linearly independent?", back: "The only linear combination equal to $\\mathbf{0}$ is the trivial one (all scalars zero). None is a combination of the others." },
            { front: "What is a basis?", back: "A minimal spanning set: linearly independent AND spans the space. Its size = the dimension." }
          ],
          homework: [
            { prompt: "Are $\\begin{bmatrix}1\\\\2\\end{bmatrix}$ and $\\begin{bmatrix}2\\\\4\\end{bmatrix}$ independent?", hint: "Is one a scalar multiple of the other?", solution: "No — the second is $2\\times$ the first, so they are dependent and span only a line." },
            { prompt: "What is the dimension of the span of $\\begin{bmatrix}1\\\\0\\\\0\\end{bmatrix},\\begin{bmatrix}0\\\\1\\\\0\\end{bmatrix},\\begin{bmatrix}1\\\\1\\\\0\\end{bmatrix}$?", hint: "Is the third vector new, or a combination of the first two?", solution: "Dimension 2. The third is $\\mathbf{e}_1+\\mathbf{e}_2$, so only two independent directions — they span the $xy$-plane." }
          ]
        }
      ]
    },
    {
      id: "la-m2",
      title: "Matrices as Transformations",
      lessons: [
        {
          id: "la-matrix-transform",
          title: "Matrices = Linear Maps",
          minutes: 16,
          content: `
<h3>A matrix moves space</h3>
<p>The deepest idea in linear algebra: <strong>a matrix is a function that transforms space linearly</strong>. The columns of the matrix tell you where the basis vectors land.</p>
$$ A = \\begin{bmatrix} \\,|\\, & \\,|\\, \\\\ A\\mathbf{e}_1 & A\\mathbf{e}_2 \\\\ \\,|\\, & \\,|\\, \\end{bmatrix} $$
<p>"Linear" means grid lines stay straight, parallel, and evenly spaced, and the origin stays put. To find where any vector goes, write it in terms of the basis and use linearity:</p>
$$ A(x\\mathbf{e}_1 + y\\mathbf{e}_2) = x\\,(A\\mathbf{e}_1) + y\\,(A\\mathbf{e}_2) $$
<h4>Matrix–vector product</h4>
$$ \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}\\begin{bmatrix} x \\\\ y \\end{bmatrix} = x\\begin{bmatrix} a \\\\ c \\end{bmatrix} + y\\begin{bmatrix} b \\\\ d \\end{bmatrix} = \\begin{bmatrix} ax+by \\\\ cx+dy \\end{bmatrix} $$
<div class="callout"><div class="c-tag">Read it as</div>
The output is a <strong>linear combination of the columns of A</strong>, weighted by the input's entries. This view explains everything that follows.</div>
<h4>Composition = multiplication</h4>
<p>Applying transformation $B$ then $A$ is the single transformation $AB$. That's <em>why</em> matrix multiplication is defined the (seemingly weird) way it is — and why order matters: $AB \\neq BA$ in general.</p>
<div class="callout sage"><div class="c-tag">Example transforms</div>
Rotation by $90°$: $\\begin{bmatrix}0&-1\\\\1&0\\end{bmatrix}$ &nbsp;•&nbsp; Horizontal shear: $\\begin{bmatrix}1&1\\\\0&1\\end{bmatrix}$ &nbsp;•&nbsp; Scale-by-2: $\\begin{bmatrix}2&0\\\\0&2\\end{bmatrix}$</div>`,
          mcq: [
            {
              q: "The columns of a transformation matrix $A$ tell you…",
              choices: ["The eigenvalues of A", "Where the basis vectors land after the transformation", "The determinant", "Which rows are independent"],
              answer: 1,
              explain: "Column $j$ of $A$ is exactly $A\\mathbf{e}_j$ — the image of the $j$-th basis vector. That fully determines the linear map."
            },
            {
              q: "Why is matrix multiplication generally non-commutative ($AB \\neq BA$)?",
              choices: ["A bug in the definition", "Because it represents composition of functions, and order of operations matters", "Because matrices have different sizes", "It actually is commutative"],
              answer: 1,
              explain: "$AB$ means 'do B, then A'. Rotating then shearing differs from shearing then rotating — function composition is order-sensitive."
            }
          ],
          flashcards: [
            { front: "What do the columns of matrix $A$ represent geometrically?", back: "Where the standard basis vectors land: column $j = A\\mathbf{e}_j$." },
            { front: "Matrix–vector product $A\\mathbf{x}$ is what kind of combination?", back: "A linear combination of $A$'s columns, weighted by the entries of $\\mathbf{x}$." },
            { front: "What does the matrix product $AB$ represent?", back: "Composition: apply $B$ first, then $A$. Order matters, so $AB\\neq BA$ in general." }
          ],
          homework: [
            { prompt: "Apply $\\begin{bmatrix}0&-1\\\\1&0\\end{bmatrix}$ to $\\begin{bmatrix}3\\\\0\\end{bmatrix}$. What transformation is this?", hint: "Output = 3·(first column).", solution: "$\\begin{bmatrix}0\\\\3\\end{bmatrix}$. It's a $90°$ counter-clockwise rotation: the point on the $x$-axis swings up to the $y$-axis." },
            { prompt: "Compute $\\begin{bmatrix}1&1\\\\0&1\\end{bmatrix}\\begin{bmatrix}2&0\\\\0&2\\end{bmatrix}$.", hint: "Multiply rows by columns, or think 'scale-by-2 then shear'.", solution: "$\\begin{bmatrix}2&2\\\\0&2\\end{bmatrix}$." }
          ]
        },
        {
          id: "la-determinant",
          title: "Determinants & Invertibility",
          minutes: 13,
          content: `
<h3>The determinant: how area scales</h3>
<p>The <strong>determinant</strong> of a matrix measures how much it stretches or shrinks area (in 2D) or volume (in 3D). A determinant of 3 means areas triple; a determinant of 0 means space gets <em>squashed</em> into a lower dimension.</p>
$$ \\det\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix} = ad - bc $$
<div class="callout"><div class="c-tag">Sign of the determinant</div>
A <strong>negative</strong> determinant means the transformation flips orientation (like a mirror). Zero means it collapses dimensions — no inverse possible.</div>
<h4>Invertibility</h4>
<p>A square matrix $A$ is <strong>invertible</strong> exactly when $\\det A \\neq 0$. If the determinant is zero, information is lost (multiple inputs map to the same output), so you can't undo it.</p>
$$ A^{-1}A = I, \\qquad A \\text{ invertible} \\iff \\det A \\neq 0 $$
<div class="callout sage"><div class="c-tag">Solving $A\\mathbf{x}=\\mathbf{b}$</div>
If $A$ is invertible there's exactly one solution $\\mathbf{x}=A^{-1}\\mathbf{b}$. If $\\det A = 0$, there are either no solutions or infinitely many.</div>`,
          mcq: [
            {
              q: "$\\det A = 0$ means the transformation…",
              choices: ["Doubles all areas", "Collapses space into a lower dimension (not invertible)", "Is a pure rotation", "Has orthonormal columns"],
              answer: 1,
              explain: "A zero determinant means area/volume is crushed to zero — the map squashes space onto a line/plane, loses information, and has no inverse."
            },
            {
              q: "$\\det\\begin{bmatrix}2&1\\\\4&2\\end{bmatrix}$ equals…",
              choices: ["0", "8", "2", "-2"],
              answer: 0,
              explain: "$ad-bc = 2\\cdot2 - 1\\cdot4 = 4-4 = 0$. The rows are proportional, so the matrix is singular."
            }
          ],
          flashcards: [
            { front: "Geometric meaning of the determinant?", back: "The factor by which the transformation scales area (2D) / volume (3D). Negative = orientation flip." },
            { front: "When is a square matrix invertible?", back: "Exactly when $\\det A \\neq 0$ (equivalently: full rank, independent columns, trivial null space)." },
            { front: "Formula for $\\det\\begin{bmatrix}a&b\\\\c&d\\end{bmatrix}$?", back: "$ad - bc$." }
          ],
          homework: [
            { prompt: "Is $\\begin{bmatrix}3&2\\\\6&5\\end{bmatrix}$ invertible? Find $\\det$.", hint: "Compute $ad-bc$.", solution: "$\\det = 15-12 = 3 \\neq 0$, so yes, it's invertible." },
            { prompt: "For what value of $k$ is $\\begin{bmatrix}k&2\\\\2&k\\end{bmatrix}$ singular?", hint: "Set the determinant to zero.", solution: "$\\det = k^2-4 = 0 \\Rightarrow k = \\pm 2$." }
          ]
        }
      ]
    },
    {
      id: "la-m3",
      title: "Eigen-everything",
      lessons: [
        {
          id: "la-eigen",
          title: "Eigenvalues & Eigenvectors",
          minutes: 17,
          content: `
<h3>Directions that don't turn</h3>
<p>Most vectors get knocked off their span when you apply a matrix. But special vectors — <strong>eigenvectors</strong> — stay on their own line; they only get scaled. The scale factor is the <strong>eigenvalue</strong> $\\lambda$.</p>
$$ A\\mathbf{v} = \\lambda \\mathbf{v}, \\qquad \\mathbf{v} \\neq \\mathbf{0} $$
<p>To find them, rearrange to $(A - \\lambda I)\\mathbf{v} = \\mathbf{0}$. A nonzero solution exists only when the matrix is singular:</p>
$$ \\det(A - \\lambda I) = 0 \\quad\\text{(the characteristic equation)} $$
<div class="callout"><div class="c-tag">Recipe</div>
1) Solve $\\det(A-\\lambda I)=0$ for the eigenvalues $\\lambda$. &nbsp; 2) For each $\\lambda$, solve $(A-\\lambda I)\\mathbf{v}=\\mathbf{0}$ for its eigenvectors.</div>
<h4>Why anyone cares</h4>
<ul>
  <li><strong>PCA</strong> — eigenvectors of the covariance matrix are the directions of maximum variance in your data.</li>
  <li><strong>PageRank</strong> — the ranking is the dominant eigenvector of the web's link matrix.</li>
  <li><strong>Dynamics</strong> — repeated application $A^k$ is trivial in the eigenbasis: just raise each $\\lambda$ to the $k$.</li>
</ul>
<div class="callout violet"><div class="c-tag">Diagonalization</div>
If $A$ has a full set of eigenvectors, then $A = PDP^{-1}$ where $D$ is diagonal (the eigenvalues) and $P$'s columns are the eigenvectors. Hard matrix powers become easy: $A^k = PD^kP^{-1}$.</div>`,
          mcq: [
            {
              q: "An eigenvector $\\mathbf{v}$ of $A$ satisfies…",
              choices: ["$A\\mathbf{v} = \\mathbf{0}$", "$A\\mathbf{v} = \\lambda\\mathbf{v}$ for some scalar $\\lambda$", "$\\mathbf{v}^\\top A = 0$", "$A\\mathbf{v} \\perp \\mathbf{v}$"],
              answer: 1,
              explain: "By definition $A\\mathbf{v}=\\lambda\\mathbf{v}$: the matrix only stretches/shrinks the eigenvector, never rotates it off its line."
            },
            {
              q: "Eigenvalues are found by solving…",
              choices: ["$\\det(A) = 0$", "$\\det(A - \\lambda I) = 0$", "$A\\mathbf{x} = \\mathbf{b}$", "$\\text{trace}(A) = 0$"],
              answer: 1,
              explain: "The characteristic equation $\\det(A-\\lambda I)=0$ gives the eigenvalues; each then yields its eigenvectors."
            }
          ],
          flashcards: [
            { front: "Define eigenvector and eigenvalue.", back: "A nonzero $\\mathbf{v}$ with $A\\mathbf{v}=\\lambda\\mathbf{v}$. $\\mathbf{v}$ keeps its direction; $\\lambda$ is the scale factor." },
            { front: "How do you find eigenvalues?", back: "Solve the characteristic equation $\\det(A-\\lambda I)=0$." },
            { front: "What is diagonalization $A=PDP^{-1}$ good for?", back: "Computing powers/functions of $A$ easily: $A^k = PD^kP^{-1}$. $P$ = eigenvectors, $D$ = eigenvalues." },
            { front: "Where do eigenvectors show up in ML?", back: "PCA (covariance eigenvectors = principal directions), PageRank (dominant eigenvector), spectral clustering." }
          ],
          homework: [
            { prompt: "Find the eigenvalues of $\\begin{bmatrix}2&0\\\\0&3\\end{bmatrix}$.", hint: "It's diagonal — read them off, or solve $\\det(A-\\lambda I)=0$.", solution: "$\\lambda=2$ and $\\lambda=3$ (the diagonal entries). Eigenvectors are $\\mathbf{e}_1$ and $\\mathbf{e}_2$." },
            { prompt: "Find the eigenvalues of $\\begin{bmatrix}2&1\\\\1&2\\end{bmatrix}$.", hint: "$\\det(A-\\lambda I) = (2-\\lambda)^2 - 1 = 0$.", solution: "$(2-\\lambda)^2=1 \\Rightarrow 2-\\lambda=\\pm1 \\Rightarrow \\lambda=1,\\ 3$." }
          ]
        }
      ]
    }
  ]
},

/* ============================== CALCULUS ============================== */
{
  id: "calculus",
  title: "Calculus",
  icon: "∂",
  color: "#88a37a",
  blurb: "Limits, derivatives, integrals, and the multivariable gradients that power gradient descent.",
  modules: [
    {
      id: "ca-m1",
      title: "Derivatives",
      lessons: [
        {
          id: "ca-derivative",
          title: "The Derivative as a Rate of Change",
          minutes: 14,
          content: `
<h3>Instantaneous rate of change</h3>
<p>The <strong>derivative</strong> $f'(x)$ measures how fast $f$ changes at a point — the slope of the tangent line. It's the limit of the average rate of change as the interval shrinks to zero:</p>
$$ f'(x) = \\lim_{h\\to 0} \\frac{f(x+h) - f(x)}{h} $$
<h4>Rules you'll use constantly</h4>
<ul>
  <li><strong>Power rule:</strong> $\\frac{d}{dx}x^n = n x^{n-1}$</li>
  <li><strong>Product rule:</strong> $(fg)' = f'g + fg'$</li>
  <li><strong>Chain rule:</strong> $\\frac{d}{dx}f(g(x)) = f'(g(x))\\,g'(x)$</li>
</ul>
<div class="callout violet"><div class="c-tag">The chain rule IS backprop</div>
Training a neural network = applying the chain rule through many composed functions. Backpropagation is just the chain rule, organized efficiently. If you master one rule, make it this one.</div>
<h4>Worked example</h4>
<p>For $f(x) = (3x^2+1)^4$, set $g=3x^2+1$. Then $f'(x) = 4(3x^2+1)^3 \\cdot 6x = 24x(3x^2+1)^3$.</p>
<div class="callout"><div class="c-tag">Reading it</div>
$f'(x) > 0$ → increasing. $f'(x) < 0$ → decreasing. $f'(x) = 0$ → flat: a peak, valley, or saddle. Optimization hunts for these flat spots.</div>`,
          mcq: [
            {
              q: "The derivative $f'(x)$ geometrically is…",
              choices: ["The area under the curve", "The slope of the tangent line at $x$", "The y-intercept", "The maximum value of $f$"],
              answer: 1,
              explain: "The derivative is the instantaneous slope — the slope of the line tangent to the curve at that point."
            },
            {
              q: "$\\frac{d}{dx}(x^3)$ equals…",
              choices: ["$3x^2$", "$x^2$", "$3x$", "$\\frac{1}{4}x^4$"],
              answer: 0,
              explain: "Power rule: bring down the exponent and subtract one — $3x^{3-1}=3x^2$."
            }
          ],
          flashcards: [
            { front: "Definition of the derivative (limit form)?", back: "$f'(x)=\\lim_{h\\to0}\\frac{f(x+h)-f(x)}{h}$ — slope of the tangent." },
            { front: "Power rule?", back: "$\\frac{d}{dx}x^n = n x^{n-1}$." },
            { front: "Chain rule?", back: "$\\frac{d}{dx}f(g(x)) = f'(g(x))\\cdot g'(x)$. This is the heart of backpropagation." }
          ],
          homework: [
            { prompt: "Differentiate $f(x) = 5x^4 - 2x + 7$.", hint: "Apply the power rule term by term.", solution: "$f'(x) = 20x^3 - 2$." },
            { prompt: "Differentiate $f(x) = \\sin(x^2)$.", hint: "Chain rule with outer $\\sin$, inner $x^2$.", solution: "$f'(x) = \\cos(x^2)\\cdot 2x = 2x\\cos(x^2)$." }
          ]
        },
        {
          id: "ca-gradient",
          title: "Partial Derivatives & the Gradient",
          minutes: 16,
          content: `
<h3>Calculus in many dimensions</h3>
<p>ML loss functions depend on millions of parameters. A <strong>partial derivative</strong> $\\frac{\\partial f}{\\partial x_i}$ asks: how does $f$ change if I nudge <em>just</em> $x_i$, holding the rest fixed?</p>
<p>Stack all partials into the <strong>gradient</strong> vector:</p>
$$ \\nabla f = \\begin{bmatrix} \\partial f/\\partial x_1 \\\\ \\partial f/\\partial x_2 \\\\ \\vdots \\\\ \\partial f/\\partial x_n \\end{bmatrix} $$
<div class="callout sage"><div class="c-tag">Key fact</div>
The gradient points in the direction of <strong>steepest ascent</strong>. To minimize a loss, step in the <em>opposite</em> direction — that's gradient descent.</div>
$$ \\theta_{t+1} = \\theta_t - \\eta\\,\\nabla L(\\theta_t) $$
<p>Here $\\eta$ is the <strong>learning rate</strong>: too big and you overshoot, too small and training crawls.</p>
<h4>Example</h4>
<p>For $f(x,y) = x^2 + 3xy$: &nbsp; $\\frac{\\partial f}{\\partial x} = 2x + 3y$, &nbsp; $\\frac{\\partial f}{\\partial y} = 3x$. &nbsp; So $\\nabla f = \\begin{bmatrix}2x+3y \\\\ 3x\\end{bmatrix}$.</p>`,
          mcq: [
            {
              q: "The gradient $\\nabla f$ points in the direction of…",
              choices: ["Steepest descent", "Steepest ascent", "Zero change", "The nearest minimum"],
              answer: 1,
              explain: "The gradient points toward steepest ASCENT. Gradient descent therefore moves along $-\\nabla f$."
            },
            {
              q: "In gradient descent, the learning rate $\\eta$ controls…",
              choices: ["The number of parameters", "The size of each update step", "The loss function shape", "The batch size"],
              answer: 1,
              explain: "$\\eta$ scales the step. Too large overshoots/diverges; too small makes training painfully slow."
            }
          ],
          flashcards: [
            { front: "What is a partial derivative $\\partial f/\\partial x_i$?", back: "Rate of change of $f$ when nudging only $x_i$, holding all other variables fixed." },
            { front: "What is the gradient $\\nabla f$?", back: "Vector of all partial derivatives. Points in direction of steepest ascent; its magnitude is the steepest slope." },
            { front: "Gradient descent update rule?", back: "$\\theta \\leftarrow \\theta - \\eta\\nabla L(\\theta)$. Step opposite the gradient, scaled by learning rate $\\eta$." }
          ],
          homework: [
            { prompt: "Find $\\nabla f$ for $f(x,y)=x^2y + y^3$.", hint: "Differentiate w.r.t. $x$, then $y$.", solution: "$\\frac{\\partial f}{\\partial x}=2xy$, $\\frac{\\partial f}{\\partial y}=x^2+3y^2$. So $\\nabla f=\\begin{bmatrix}2xy\\\\x^2+3y^2\\end{bmatrix}$." },
            { prompt: "At $(1,2)$ with $\\eta=0.1$, give one gradient-descent step for $f(x,y)=x^2+y^2$.", hint: "$\\nabla f=[2x,2y]$; new point = old $-\\eta\\nabla f$.", solution: "$\\nabla f=[2,4]$. Step: $[1,2]-0.1[2,4]=[0.8,1.6]$." }
          ]
        }
      ]
    }
  ]
},

/* ============================== ALGORITHMS ============================== */
{
  id: "algorithms",
  title: "Algorithms",
  icon: "⊳",
  color: "#9a8bc4",
  blurb: "Complexity, the core data structures, and the problem-solving patterns behind efficient code.",
  modules: [
    {
      id: "al-m1",
      title: "Foundations",
      lessons: [
        {
          id: "al-bigo",
          title: "Big-O & Complexity Analysis",
          minutes: 14,
          content: `
<h3>Measuring cost without a stopwatch</h3>
<p><strong>Big-O</strong> describes how an algorithm's running time grows as the input size $n$ grows — ignoring constants and hardware. It captures the <em>shape</em> of the cost curve.</p>
<ul>
  <li>$O(1)$ — constant. Array index lookup.</li>
  <li>$O(\\log n)$ — logarithmic. Binary search.</li>
  <li>$O(n)$ — linear. One pass through the data.</li>
  <li>$O(n\\log n)$ — the speed of good sorting (mergesort, heapsort).</li>
  <li>$O(n^2)$ — quadratic. Nested loops over all pairs.</li>
  <li>$O(2^n)$ — exponential. Brute-forcing all subsets — avoid for large $n$.</li>
</ul>
<div class="callout"><div class="c-tag">Rules of thumb</div>
Drop constants ($O(2n)\\to O(n)$) and keep only the dominant term ($O(n^2+n)\\to O(n^2)$). Big-O is about asymptotic growth, not exact counts.</div>
<h4>Why it matters</h4>
<p>At $n = 1{,}000{,}000$: an $O(n)$ algorithm does ~$10^6$ steps; an $O(n^2)$ one does ~$10^{12}$ — the difference between milliseconds and a week. Picking the right complexity class matters far more than micro-optimizing.</p>
<div class="callout sage"><div class="c-tag">Also track space</div>
Space complexity measures extra memory used. An in-place sort is $O(1)$ extra space; building a hash map of all elements is $O(n)$.</div>`,
          mcq: [
            {
              q: "Binary search on a sorted array runs in…",
              choices: ["$O(1)$", "$O(\\log n)$", "$O(n)$", "$O(n^2)$"],
              answer: 1,
              explain: "Each step halves the search range, so it takes about $\\log_2 n$ steps — logarithmic time."
            },
            {
              q: "$O(2n^2 + 5n + 100)$ simplifies to…",
              choices: ["$O(n)$", "$O(n^2)$", "$O(2n^2)$", "$O(n^2 + n)$"],
              answer: 1,
              explain: "Drop constants and lower-order terms; only the dominant $n^2$ term remains: $O(n^2)$."
            }
          ],
          flashcards: [
            { front: "What does Big-O measure?", back: "Asymptotic growth of time (or space) as input size $n$ grows, ignoring constants and lower-order terms." },
            { front: "Complexity of binary search?", back: "$O(\\log n)$ — each comparison halves the remaining range." },
            { front: "Complexity of comparison-based sorting at best?", back: "$O(n\\log n)$ — e.g. mergesort, heapsort. You can't beat it with comparisons alone." }
          ],
          homework: [
            { prompt: "What's the time complexity of two nested loops, each running $n$ times?", hint: "Multiply the loop counts.", solution: "$O(n^2)$ — the inner loop runs $n$ times for each of the $n$ outer iterations." },
            { prompt: "An algorithm halves its input each step until size 1. How many steps for $n=1024$?", hint: "How many times can you halve 1024?", solution: "$\\log_2 1024 = 10$ steps — this is the $O(\\log n)$ pattern." }
          ]
        },
        {
          id: "al-structures",
          title: "Core Data Structures",
          minutes: 15,
          content: `
<h3>Choosing the right container</h3>
<p>The right data structure turns a slow algorithm into a fast one. Know the trade-offs:</p>
<h4>Array / Dynamic array</h4>
<ul><li>Index access: $O(1)$. Append (amortized): $O(1)$. Insert/delete in middle: $O(n)$.</li></ul>
<h4>Hash map (dictionary)</h4>
<ul><li>Insert / lookup / delete: $O(1)$ average. The workhorse for "have I seen this?" and counting.</li></ul>
<h4>Stack & Queue</h4>
<ul><li><strong>Stack</strong> — LIFO (last in, first out). Undo, recursion, DFS.</li>
<li><strong>Queue</strong> — FIFO (first in, first out). Scheduling, BFS.</li></ul>
<h4>Tree / Heap / Graph</h4>
<ul><li><strong>Binary heap</strong> — get the min/max in $O(\\log n)$; the basis of priority queues.</li>
<li><strong>Balanced BST</strong> — sorted operations in $O(\\log n)$.</li>
<li><strong>Graph</strong> — nodes + edges; model networks, dependencies, maps.</li></ul>
<div class="callout violet"><div class="c-tag">Pattern</div>
Most interview/real problems reduce to: "which structure makes the key operation $O(1)$ or $O(\\log n)$ instead of $O(n)$?"</div>`,
          mcq: [
            {
              q: "Average lookup time in a hash map is…",
              choices: ["$O(1)$", "$O(\\log n)$", "$O(n)$", "$O(n\\log n)$"],
              answer: 0,
              explain: "Hashing jumps straight to the bucket, giving $O(1)$ average lookup/insert/delete."
            },
            {
              q: "A stack follows which ordering?",
              choices: ["FIFO — first in, first out", "LIFO — last in, first out", "Sorted order", "Random"],
              answer: 1,
              explain: "A stack is LIFO: the most recently pushed item is the first popped — like a stack of plates."
            }
          ],
          flashcards: [
            { front: "Array index access vs middle insertion complexity?", back: "Index access $O(1)$; insert/delete in the middle $O(n)$ (must shift elements)." },
            { front: "Stack vs Queue ordering?", back: "Stack = LIFO (last in first out). Queue = FIFO (first in first out)." },
            { front: "What does a binary heap give you, and how fast?", back: "Access to min (or max) in $O(1)$, insert/extract in $O(\\log n)$ — basis of a priority queue." }
          ],
          homework: [
            { prompt: "You need to count word frequencies in a document. Which structure?", hint: "You want $O(1)$ 'have I seen this word, and how many times?'", solution: "A hash map (dictionary) from word → count. Each word is processed in $O(1)$ average, total $O(n)$." },
            { prompt: "BFS (breadth-first search) uses which structure to track frontier nodes?", hint: "Process nodes in the order discovered.", solution: "A queue (FIFO) — ensuring nodes are explored level by level." }
          ]
        }
      ]
    }
  ]
},

/* ============================== DEEP LEARNING ============================== */
{
  id: "deep-learning",
  title: "Deep Learning",
  icon: "◉",
  color: "#d2715a",
  blurb: "Neurons, backpropagation, and the architectures that learn representations from data.",
  modules: [
    {
      id: "dl-m1",
      title: "Neural Network Foundations",
      lessons: [
        {
          id: "dl-neuron",
          title: "The Neuron & Activation Functions",
          minutes: 15,
          content: `
<h3>From linear to learnable</h3>
<p>A single artificial <strong>neuron</strong> computes a weighted sum of its inputs, adds a bias, then applies a nonlinear <strong>activation</strong>:</p>
$$ a = \\sigma\\!\\left( \\sum_i w_i x_i + b \\right) = \\sigma(\\mathbf{w}^\\top\\mathbf{x} + b) $$
<p>The weighted sum is pure linear algebra; the activation $\\sigma$ is what lets networks model curves, not just lines.</p>
<h4>Common activations</h4>
<ul>
  <li><strong>ReLU:</strong> $\\max(0, z)$ — cheap, the default for hidden layers.</li>
  <li><strong>Sigmoid:</strong> $\\frac{1}{1+e^{-z}}$ — squashes to $(0,1)$; used for probabilities.</li>
  <li><strong>Tanh:</strong> squashes to $(-1,1)$, zero-centered.</li>
  <li><strong>Softmax:</strong> turns a vector into a probability distribution over classes.</li>
</ul>
<div class="callout"><div class="c-tag">Why nonlinearity is essential</div>
Stack linear layers with no activation and the whole network collapses to a single linear map — no matter how deep. The activation is what gives depth its power.</div>
<div class="callout sage"><div class="c-tag">A layer, vectorized</div>
A full layer is just $\\mathbf{a} = \\sigma(W\\mathbf{x} + \\mathbf{b})$ — a matrix multiply plus a bias plus an elementwise nonlinearity.</div>`,
          mcq: [
            {
              q: "Why do neural networks need nonlinear activation functions?",
              choices: ["To speed up training", "Otherwise stacked layers collapse into a single linear function", "To reduce the number of parameters", "To make gradients larger"],
              answer: 1,
              explain: "Composing linear maps yields another linear map. Without nonlinearity, depth adds no expressive power."
            },
            {
              q: "The ReLU activation is defined as…",
              choices: ["$\\frac{1}{1+e^{-z}}$", "$\\max(0, z)$", "$\\tanh(z)$", "$z^2$"],
              answer: 1,
              explain: "ReLU = $\\max(0,z)$: pass positives through, clamp negatives to zero. Cheap and effective."
            }
          ],
          flashcards: [
            { front: "What does a single neuron compute?", back: "$\\sigma(\\mathbf{w}^\\top\\mathbf{x}+b)$ — weighted sum of inputs plus bias, then a nonlinear activation." },
            { front: "Why is a nonlinear activation necessary?", back: "Without it, stacked layers collapse to one linear map; depth gains no expressive power." },
            { front: "Define ReLU, sigmoid, and softmax.", back: "ReLU: $\\max(0,z)$. Sigmoid: $1/(1+e^{-z})\\to(0,1)$. Softmax: normalizes a vector into a probability distribution." }
          ],
          homework: [
            { prompt: "Compute ReLU output for inputs $[-3, 0, 2, 5]$.", hint: "Clamp negatives to 0.", solution: "$[0, 0, 2, 5]$." },
            { prompt: "A neuron has weights $[2,-1]$, bias $1$, input $[3,4]$, ReLU activation. Output?", hint: "Weighted sum + bias, then ReLU.", solution: "$2\\cdot3+(-1)\\cdot4+1=3$; ReLU$(3)=3$." }
          ]
        },
        {
          id: "dl-backprop",
          title: "Backpropagation & Training",
          minutes: 17,
          content: `
<h3>How networks learn</h3>
<p>Training has four repeating steps:</p>
<ol>
  <li><strong>Forward pass</strong> — run inputs through the network to get predictions.</li>
  <li><strong>Loss</strong> — measure error vs the true labels (e.g. cross-entropy, MSE).</li>
  <li><strong>Backward pass</strong> — use the chain rule to compute $\\partial L/\\partial w$ for every weight.</li>
  <li><strong>Update</strong> — nudge each weight down its gradient: $w \\leftarrow w - \\eta\\,\\partial L/\\partial w$.</li>
</ol>
<div class="callout violet"><div class="c-tag">Backprop = chain rule, organized</div>
Backpropagation computes gradients layer by layer from output back to input, reusing intermediate results so the whole pass costs about the same as one forward pass.</div>
<h4>Loss functions</h4>
<ul>
  <li><strong>MSE</strong> $\\frac1n\\sum(\\hat y - y)^2$ — regression.</li>
  <li><strong>Cross-entropy</strong> $-\\sum y\\log\\hat y$ — classification.</li>
</ul>
<div class="callout"><div class="c-tag">Common failure modes</div>
<strong>Vanishing gradients</strong> (signal dies in deep nets — mitigated by ReLU, residual connections). <strong>Overfitting</strong> (memorizing training data — mitigated by dropout, regularization, more data).</div>`,
          mcq: [
            {
              q: "Backpropagation is fundamentally an application of…",
              choices: ["The power rule", "Matrix inversion", "The chain rule of calculus", "Eigen-decomposition"],
              answer: 2,
              explain: "Backprop propagates gradients through composed functions using the chain rule, efficiently and in reverse."
            },
            {
              q: "Which loss is standard for multi-class classification?",
              choices: ["Mean squared error", "Cross-entropy", "Hinge distance", "L1 norm"],
              answer: 1,
              explain: "Cross-entropy pairs naturally with softmax outputs and penalizes confident wrong predictions heavily."
            }
          ],
          flashcards: [
            { front: "The four steps of a training iteration?", back: "Forward pass → compute loss → backward pass (gradients) → update weights." },
            { front: "What mathematical rule powers backpropagation?", back: "The chain rule, applied in reverse through the network's composed functions." },
            { front: "MSE vs cross-entropy — when to use each?", back: "MSE for regression (continuous targets); cross-entropy for classification (probability outputs)." },
            { front: "What are vanishing gradients and one fix?", back: "Gradients shrink toward zero in deep nets, stalling learning. Fixes: ReLU activations, residual/skip connections, normalization." }
          ],
          homework: [
            { prompt: "Compute MSE for predictions $[2,3]$ vs targets $[1,5]$.", hint: "Average of squared differences.", solution: "$\\frac{(2-1)^2+(3-5)^2}{2}=\\frac{1+4}{2}=2.5$." },
            { prompt: "Why does the backward pass cost roughly the same as the forward pass?", hint: "Think about reusing stored intermediate values.", solution: "Backprop reuses the activations cached during the forward pass and computes each layer's gradient once, so total work is linear in the network size — comparable to one forward pass." }
          ]
        }
      ]
    }
  ]
},

/* ============================== REINFORCEMENT LEARNING ============================== */
{
  id: "reinforcement-learning",
  title: "Reinforcement Learning",
  icon: "↻",
  color: "#6fae9f",
  blurb: "Agents, rewards, and the math of learning to act — MDPs, value functions, and Q-learning.",
  modules: [
    {
      id: "rl-m1",
      title: "The RL Problem",
      lessons: [
        {
          id: "rl-mdp",
          title: "Agents, Rewards & MDPs",
          minutes: 16,
          content: `
<h3>Learning by trial and reward</h3>
<p>In RL an <strong>agent</strong> interacts with an <strong>environment</strong> over time. At each step it observes a <strong>state</strong> $s$, takes an <strong>action</strong> $a$, receives a <strong>reward</strong> $r$, and lands in a new state $s'$. The goal: maximize long-term reward.</p>
<div class="callout"><div class="c-tag">The loop</div>
state → action → reward + next state → repeat. The agent has no labeled "right answers" — only the reward signal to learn from.</div>
<h4>The Markov Decision Process (MDP)</h4>
<p>An MDP formalizes this with $(S, A, P, R, \\gamma)$: states, actions, transition probabilities $P(s'|s,a)$, rewards $R$, and a <strong>discount factor</strong> $\\gamma \\in [0,1)$. The <strong>Markov property</strong>: the future depends only on the current state, not the full history.</p>
<h4>Return and discounting</h4>
<p>The agent maximizes the expected <strong>discounted return</strong>:</p>
$$ G_t = r_t + \\gamma r_{t+1} + \\gamma^2 r_{t+2} + \\dots = \\sum_{k=0}^{\\infty} \\gamma^k r_{t+k} $$
<div class="callout sage"><div class="c-tag">Why discount?</div>
$\\gamma$ makes near-term rewards worth more than distant ones (and keeps the infinite sum finite). $\\gamma$ near 0 = myopic; near 1 = far-sighted.</div>
<h4>Policy</h4>
<p>A <strong>policy</strong> $\\pi(a|s)$ is the agent's strategy: which action to take in each state. Learning = finding the policy that maximizes expected return.</p>`,
          mcq: [
            {
              q: "The Markov property states that…",
              choices: ["Rewards are always positive", "The future depends only on the current state, not the full history", "The agent knows the optimal policy", "Actions are chosen randomly"],
              answer: 1,
              explain: "Markov = memoryless: the current state captures everything relevant for predicting the future."
            },
            {
              q: "The discount factor $\\gamma$ controls…",
              choices: ["The learning rate", "How much future rewards are valued relative to immediate ones", "The number of states", "The exploration rate"],
              answer: 1,
              explain: "$\\gamma$ weights future rewards. Low $\\gamma$ = short-sighted; high $\\gamma$ = values long-term reward."
            }
          ],
          flashcards: [
            { front: "What are the 5 components of an MDP?", back: "States $S$, actions $A$, transitions $P(s'|s,a)$, rewards $R$, discount factor $\\gamma$." },
            { front: "What is a policy $\\pi(a|s)$?", back: "The agent's strategy: a (possibly stochastic) mapping from states to actions." },
            { front: "Define the discounted return $G_t$.", back: "$G_t=\\sum_{k\\ge0}\\gamma^k r_{t+k}$ — total reward with future rewards discounted by $\\gamma$." }
          ],
          homework: [
            { prompt: "With $\\gamma=0.9$ and rewards $r_0=1, r_1=2, r_2=3$ (then 0), compute $G_0$.", hint: "$G_0 = r_0 + \\gamma r_1 + \\gamma^2 r_2$.", solution: "$1 + 0.9\\cdot2 + 0.81\\cdot3 = 1+1.8+2.43 = 5.23$." },
            { prompt: "Why must $\\gamma < 1$ for infinite-horizon tasks?", hint: "Think about whether the sum converges.", solution: "With $\\gamma<1$, the geometric series $\\sum\\gamma^k r$ converges to a finite value even over infinite steps; $\\gamma=1$ could diverge." }
          ]
        },
        {
          id: "rl-qlearning",
          title: "Value Functions & Q-Learning",
          minutes: 17,
          content: `
<h3>How good is a state? An action?</h3>
<p>Two value functions guide the agent:</p>
<ul>
  <li><strong>State value</strong> $V^\\pi(s)$ — expected return starting from state $s$ under policy $\\pi$.</li>
  <li><strong>Action value</strong> $Q^\\pi(s,a)$ — expected return from taking action $a$ in state $s$, then following $\\pi$.</li>
</ul>
<h4>The Bellman equation</h4>
<p>Value functions obey a recursive consistency relation — value now = immediate reward + discounted value of where you land:</p>
$$ Q(s,a) = r + \\gamma \\max_{a'} Q(s', a') $$
<h4>Q-learning update</h4>
<p>Q-learning learns the optimal action-values directly from experience, without a model of the environment:</p>
$$ Q(s,a) \\leftarrow Q(s,a) + \\alpha\\big[\\, r + \\gamma \\max_{a'} Q(s',a') - Q(s,a) \\,\\big] $$
<p>The bracket is the <strong>temporal-difference (TD) error</strong>: the gap between the current estimate and a better, bootstrapped one.</p>
<div class="callout violet"><div class="c-tag">Exploration vs exploitation</div>
The agent must balance <strong>exploiting</strong> known good actions against <strong>exploring</strong> to find better ones. A common scheme is $\\varepsilon$-greedy: act greedily, but with probability $\\varepsilon$ pick a random action.</div>
<div class="callout sage"><div class="c-tag">Deep RL</div>
When states are too many to tabulate (e.g. pixels), replace the Q-table with a neural network → Deep Q-Networks (DQN), which cracked Atari from raw frames.</div>`,
          mcq: [
            {
              q: "$Q(s,a)$ represents…",
              choices: ["The immediate reward only", "Expected return from taking action $a$ in state $s$, then following the policy", "The probability of action $a$", "The number of visits to state $s$"],
              answer: 1,
              explain: "The action-value $Q(s,a)$ is the expected cumulative discounted return for that action, then continuing under the policy."
            },
            {
              q: "An $\\varepsilon$-greedy policy is used to…",
              choices: ["Speed up matrix multiplication", "Balance exploration and exploitation", "Compute the discount factor", "Normalize rewards"],
              answer: 1,
              explain: "$\\varepsilon$-greedy mostly exploits the best-known action but occasionally explores at random — preventing the agent from getting stuck."
            }
          ],
          flashcards: [
            { front: "Difference between $V^\\pi(s)$ and $Q^\\pi(s,a)$?", back: "$V$ = expected return from a state; $Q$ = expected return from a state-action pair, then following $\\pi$." },
            { front: "What is the Bellman optimality relation for $Q$?", back: "$Q(s,a)=r+\\gamma\\max_{a'}Q(s',a')$ — value = reward + discounted best future value." },
            { front: "What is the TD error in Q-learning?", back: "$r+\\gamma\\max_{a'}Q(s',a')-Q(s,a)$: the gap between current estimate and a bootstrapped target." },
            { front: "What does $\\varepsilon$-greedy solve?", back: "The exploration–exploitation tradeoff: exploit the best action, but explore randomly with probability $\\varepsilon$." }
          ],
          homework: [
            { prompt: "Q-update: $Q(s,a)=2$, $r=1$, $\\gamma=0.9$, $\\max_{a'}Q(s',a')=10$, $\\alpha=0.5$. New $Q(s,a)$?", hint: "Compute the TD error, then add $\\alpha\\times$ error.", solution: "TD error $=1+0.9\\cdot10-2=8$. New $Q=2+0.5\\cdot8=6$." },
            { prompt: "Why is Q-learning called 'model-free'?", hint: "Does it need to know $P(s'|s,a)$?", solution: "It learns optimal action-values purely from sampled transitions $(s,a,r,s')$ without ever modeling the environment's transition probabilities or rewards." }
          ]
        }
      ]
    }
  ]
},

/* ============================== LLMs ============================== */
{
  id: "llm",
  title: "Large Language Models",
  icon: "❖",
  color: "#c98fb0",
  blurb: "Tokens, embeddings, attention, and the Transformer — how modern language models actually work.",
  modules: [
    {
      id: "llm-m1",
      title: "Inside the Transformer",
      lessons: [
        {
          id: "llm-tokens",
          title: "Tokens, Embeddings & Prediction",
          minutes: 15,
          content: `
<h3>Language as numbers</h3>
<p>An LLM can't read text directly. Three steps turn words into something a network can process:</p>
<ol>
  <li><strong>Tokenization</strong> — split text into <em>tokens</em> (subword chunks). "tokenization" might become <code>token</code> + <code>ization</code>. Common method: byte-pair encoding (BPE).</li>
  <li><strong>Embedding</strong> — map each token to a high-dimensional vector. Similar meanings end up nearby in this space.</li>
  <li><strong>Positional encoding</strong> — add information about each token's position, since the core attention mechanism is order-agnostic.</li>
</ol>
<div class="callout"><div class="c-tag">The core task</div>
An LLM is trained to do one thing: <strong>predict the next token</strong> given the preceding ones. Everything — answering questions, writing code, reasoning — emerges from doing this extremely well at scale.</div>
<h4>Why embeddings are powerful</h4>
<p>In embedding space, directions can carry meaning. The famous example: $\\text{king} - \\text{man} + \\text{woman} \\approx \\text{queen}$. Relationships become geometry — pure linear algebra.</p>
<div class="callout sage"><div class="c-tag">Generation</div>
The model outputs a probability distribution over the vocabulary for the next token; a sampling step (with a <em>temperature</em> knob) picks one, appends it, and repeats — autoregressively.</div>`,
          mcq: [
            {
              q: "What is the fundamental training objective of a base LLM?",
              choices: ["Classify sentiment", "Predict the next token given previous tokens", "Translate between languages", "Compress text"],
              answer: 1,
              explain: "Base LLMs are trained on next-token prediction. Other capabilities emerge from mastering this objective at scale."
            },
            {
              q: "Why are positional encodings needed in a Transformer?",
              choices: ["To compress the vocabulary", "Because the attention mechanism alone is order-agnostic", "To reduce parameters", "To tokenize the input"],
              answer: 1,
              explain: "Self-attention treats inputs as a set; positional encodings inject word-order information the model would otherwise lack."
            }
          ],
          flashcards: [
            { front: "What is a token in an LLM?", back: "A subword chunk of text (the unit the model processes). Produced by tokenizers like BPE." },
            { front: "What is an embedding?", back: "A learned high-dimensional vector for each token; semantically similar tokens lie near each other." },
            { front: "What single objective trains a base LLM?", back: "Next-token prediction: output a probability distribution over the vocabulary for the following token." },
            { front: "What does temperature control during generation?", back: "Randomness of sampling: low temperature → focused/deterministic, high → diverse/creative." }
          ],
          homework: [
            { prompt: "Why might 'unbelievable' be split into multiple tokens?", hint: "Think subword units and reuse across words.", solution: "Subword tokenizers (BPE) break rare/long words into reusable pieces like 'un', 'believ', 'able', keeping the vocabulary compact while covering any word." },
            { prompt: "Conceptually, what does $\\text{king}-\\text{man}+\\text{woman}\\approx\\text{queen}$ illustrate?", hint: "Meaning encoded as direction.", solution: "Embedding space encodes semantic relationships as consistent vector directions — 'royalty' and 'gender' become geometric offsets you can add and subtract." }
          ]
        },
        {
          id: "llm-attention",
          title: "Self-Attention & the Transformer",
          minutes: 18,
          content: `
<h3>Attention: letting tokens talk</h3>
<p><strong>Self-attention</strong> lets each token gather information from every other token, weighting them by relevance. This is how an LLM resolves "it" to the right noun, or connects a verb to its subject across a long sentence.</p>
<h4>Queries, Keys, Values</h4>
<p>Each token produces three vectors: a <strong>query</strong> (what am I looking for?), a <strong>key</strong> (what do I offer?), and a <strong>value</strong> (the content to share). Attention scores come from query·key, are normalized with softmax, and weight the values:</p>
$$ \\text{Attention}(Q,K,V) = \\text{softmax}\\!\\left(\\frac{QK^\\top}{\\sqrt{d_k}}\\right)V $$
<div class="callout"><div class="c-tag">In words</div>
For each token, compare its query to every key to get relevance weights, then take a weighted average of the values. The $\\sqrt{d_k}$ keeps the scores from blowing up.</div>
<h4>Multi-head attention</h4>
<p>Run several attention operations in parallel (<strong>heads</strong>), each free to focus on different relationships — syntax, coreference, topic — then concatenate. More perspectives, richer representation.</p>
<h4>The Transformer block</h4>
<p>Stack: multi-head attention → add &amp; normalize → feed-forward network → add &amp; normalize. Repeat dozens of times. <strong>Residual connections</strong> (the "add") let gradients flow through very deep stacks.</p>
<div class="callout violet"><div class="c-tag">Why Transformers won</div>
Unlike older RNNs, attention processes all tokens in parallel and directly connects distant tokens — making them fast to train on GPUs and great at long-range context. That scalability is what enabled today's LLMs.</div>`,
          mcq: [
            {
              q: "In self-attention, the three vectors derived per token are…",
              choices: ["Weight, bias, gradient", "Query, key, value", "Mean, variance, scale", "Input, hidden, output"],
              answer: 1,
              explain: "Each token yields a query, key, and value. Query·key gives relevance; softmaxed weights average the values."
            },
            {
              q: "Multi-head attention helps by…",
              choices: ["Reducing the vocabulary size", "Letting different heads attend to different types of relationships in parallel", "Removing the need for embeddings", "Eliminating positional information"],
              answer: 1,
              explain: "Multiple heads learn distinct relationship patterns (syntax, coreference, etc.) simultaneously, then combine — richer than a single head."
            }
          ],
          flashcards: [
            { front: "What does self-attention let each token do?", back: "Gather information from all other tokens, weighted by learned relevance — capturing long-range dependencies." },
            { front: "Write the scaled dot-product attention formula.", back: "$\\text{softmax}(QK^\\top/\\sqrt{d_k})\\,V$ — relevance from query·key, normalized, used to weight values." },
            { front: "Role of Q, K, V?", back: "Query = what I seek; Key = what I offer; Value = content shared. Scores = Q·K; output = weighted sum of V." },
            { front: "Why do Transformers use residual connections?", back: "They let gradients flow through very deep stacks, enabling stable training of dozens of layers." }
          ],
          homework: [
            { prompt: "Why divide attention scores by $\\sqrt{d_k}$?", hint: "Consider the magnitude of dot products in high dimensions.", solution: "Dot products grow with dimension; without scaling, softmax inputs get large, pushing it into saturated regions with tiny gradients. Dividing by $\\sqrt{d_k}$ keeps scores well-scaled." },
            { prompt: "What advantage does attention have over RNNs for long sequences?", hint: "Think parallelism and path length between tokens.", solution: "Attention connects any two tokens directly (constant path length) and processes all positions in parallel, unlike RNNs which pass information step-by-step and struggle with long-range dependencies." }
          ]
        }
      ]
    }
  ]
}

];
