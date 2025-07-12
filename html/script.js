// No event listener wrapper needed, thanks to the 'defer' attribute in the HTML.

const diagramTypes = [
    { value: 'actdiag', name: 'Activity Diagram (actdiag)' },
    { value: 'blockdiag', name: 'Block Diagram (blockdiag)' },
    { value: 'bpmn', name: 'BPMN (bpmn.js)' },
    { value: 'bytefield', name: 'Bytefield' },
    { value: 'c4plantuml', name: 'C4 with PlantUML' },
    { value: 'diagramsnet', name: 'Diagrams.net (draw.io)' },
    { value: 'ditaa', name: 'Ditaa' },
    { value: 'erd', name: 'Entity Relationship Diagram (erd)' },
    { value: 'excalidraw', name: 'Excalidraw' },
    { value: 'graphviz', name: 'Graphviz' },
    { value: 'mermaid', name: 'Mermaid' },
    { value: 'nomnoml', name: 'Nomnoml' },
    { value: 'nwdiag', name: 'Network Diagram (nwdiag)' },
    { value: 'packetdiag', name: 'Packet Diagram (packetdiag)' },
    { value: 'pikchr', name: 'Pikchr' },
    { value: 'plantuml', name: 'PlantUML' },
    { value: 'rackdiag', name: 'Rack Diagram (rackdiag)' },
    { value: 'seqdiag', name: 'Sequence Diagram (seqdiag)' },
    { value: 'structurizr', name: 'Structurizr' },
    { value: 'svgbob', name: 'Svgbob' },
    { value: 'symbolator', name: 'Symbolator' },
    { value: 'tikz', name: 'TikZ' },
    { value: 'umlet', name: 'UMLet' },
    { value: 'vega', name: 'Vega' },
    { value: 'vegalite', name: 'Vega-Lite' },
    { value: 'wavedrom', name: 'WaveDrom' },
    { value: 'wireviz', name: 'WireViz' },
];

const selectElement = document.getElementById('diagram-type');
const diagramFile = document.getElementById('diagram-file');
const fileNameSpan = document.getElementById('file-name');

// Populate the dropdown
diagramTypes.sort((a, b) => a.name.localeCompare(b.name)).forEach(type => {
    const option = document.createElement('option');
    option.value = type.value;
    option.textContent = type.name;
    selectElement.appendChild(option);
});

// Set a default selection
selectElement.value = 'plantuml';

// Show the selected file name
diagramFile.addEventListener('change', () => {
    fileNameSpan.textContent = diagramFile.files.length > 0 ? diagramFile.files[0].name : '';
});

// --- Form Submission Logic ---
document.getElementById('diagram-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const resultContainer = document.getElementById('result-container');
    const diagramImage = document.getElementById('diagram-image');
    const diagramLink = document.getElementById('diagram-link');
    const errorMessage = document.getElementById('error-message');

    const diagramType = selectElement.value;
    const file = diagramFile.files[0];
    const diagramSource = document.getElementById('diagram-source').value;

    resultContainer.classList.remove('hidden');
    errorMessage.classList.add('hidden');
    diagramImage.classList.add('hidden');
    diagramLink.classList.add('hidden');

    try {
        let imageUrl;
        // Prioritize file upload
        if (file) {
            const fileContent = await file.text();
            const response = await fetch(`/kroki/${diagramType}/svg`, {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain' },
                body: fileContent
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server responded with status: ${response.status} ${response.statusText}. Response: ${errorText}`);
            }
            const imageBlob = await response.blob();
            imageUrl = URL.createObjectURL(imageBlob);
        } else if (diagramSource.trim()) {
            const compressed = pako.deflate(diagramSource, { to: 'string' });
            const urlSafeBase64 = btoa(compressed).replace(/\+/g, '-').replace(/\//g, '_');
            imageUrl = `/kroki/${diagramType}/svg/${urlSafeBase64}`;
        } else {
            throw new Error('Please enter diagram source code or upload a file.');
        }

        diagramImage.src = imageUrl;
        diagramImage.classList.remove('hidden');
        diagramLink.href = imageUrl;
        diagramLink.classList.remove('hidden');

    } catch (error) {
        errorMessage.textContent = `Error: ${error.message}`;
        errorMessage.classList.remove('hidden');
    }
});
