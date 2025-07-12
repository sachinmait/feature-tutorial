// Application Data
const data = {
  housing: {
    features: ["bedrooms", "bathrooms", "area_sqft", "age_years", "location_score", "garage", "garden", "basement"],
    sampleData: [
      {"bedrooms": 3, "bathrooms": 2, "area_sqft": 1500, "age_years": 10, "location_score": 8, "garage": 1, "garden": 1, "basement": 0, "price": 350000},
      {"bedrooms": 4, "bathrooms": 3, "area_sqft": 2000, "age_years": 5, "location_score": 9, "garage": 1, "garden": 1, "basement": 1, "price": 450000},
      {"bedrooms": 2, "bathrooms": 1, "area_sqft": 1000, "age_years": 20, "location_score": 6, "garage": 0, "garden": 0, "basement": 0, "price": 250000},
      {"bedrooms": 5, "bathrooms": 4, "area_sqft": 2500, "age_years": 2, "location_score": 10, "garage": 2, "garden": 1, "basement": 1, "price": 650000},
      {"bedrooms": 3, "bathrooms": 2, "area_sqft": 1800, "age_years": 15, "location_score": 7, "garage": 1, "garden": 0, "basement": 1, "price": 320000}
    ]
  },
  iris: {
    features: ["sepal_length", "sepal_width", "petal_length", "petal_width"],
    sampleData: [
      {"sepal_length": 5.1, "sepal_width": 3.5, "petal_length": 1.4, "petal_width": 0.2, "species": "setosa"},
      {"sepal_length": 4.9, "sepal_width": 3.0, "petal_length": 1.4, "petal_width": 0.2, "species": "setosa"},
      {"sepal_length": 7.0, "sepal_width": 3.2, "petal_length": 4.7, "petal_width": 1.4, "species": "versicolor"},
      {"sepal_length": 6.4, "sepal_width": 3.2, "petal_length": 4.5, "petal_width": 1.5, "species": "versicolor"},
      {"sepal_length": 6.3, "sepal_width": 3.3, "petal_length": 6.0, "petal_width": 2.5, "species": "virginica"},
      {"sepal_length": 5.8, "sepal_width": 2.7, "petal_length": 5.1, "petal_width": 1.9, "species": "virginica"}
    ]
  }
};

// Global chart instances
let charts = {};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  initializeNavigation();
  initializeTabs();
  initializeIntroduction();
  initializeFeatureSelection();
  initializeFeatureExtraction();
  initializePractice();
});

// Navigation functionality
function initializeNavigation() {
  const navButtons = document.querySelectorAll('.nav-btn');
  const sections = document.querySelectorAll('.section');

  navButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetSection = button.dataset.section;
      
      // Update active navigation button
      navButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Show target section
      sections.forEach(section => {
        section.classList.remove('active');
        if (section.id === targetSection) {
          section.classList.add('active');
        }
      });
    });
  });
}

// Tab functionality
function initializeTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.dataset.tab;
      const parentSection = button.closest('.section');
      
      // Update active tab button
      parentSection.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Show target tab content
      parentSection.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
        if (content.id === targetTab) {
          content.classList.add('active');
        }
      });
    });
  });
}

// Initialize Introduction section
function initializeIntroduction() {
  createIntroChart();
}

function createIntroChart() {
  const ctx = document.getElementById('introChart').getContext('2d');
  
  // Create correlation data for housing features
  const correlationData = {
    labels: ['Bedrooms', 'Bathrooms', 'Area', 'Age', 'Location', 'Garage'],
    datasets: [{
      label: 'Correlation with Price',
      data: [0.65, 0.72, 0.89, -0.45, 0.83, 0.41],
      backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545'],
      borderColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545'],
      borderWidth: 2
    }]
  };

  charts.intro = new Chart(ctx, {
    type: 'bar',
    data: correlationData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Feature Correlation with House Price'
        },
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          min: -1,
          max: 1,
          title: {
            display: true,
            text: 'Correlation Coefficient'
          }
        }
      }
    }
  });
}

// Initialize Feature Selection section
function initializeFeatureSelection() {
  initializeFilterMethod();
  initializeWrapperMethod();
  initializeEmbeddedMethod();
}

function initializeFilterMethod() {
  const threshold = document.getElementById('correlationThreshold');
  const thresholdValue = document.getElementById('correlationValue');
  const featuresContainer = document.getElementById('filterFeatures');
  
  // Feature correlations (simulated)
  const correlations = {
    'bedrooms': 0.65,
    'bathrooms': 0.72,
    'area_sqft': 0.89,
    'age_years': -0.45,
    'location_score': 0.83,
    'garage': 0.41,
    'garden': 0.23,
    'basement': 0.38
  };
  
  function updateFilterFeatures() {
    const thresholdVal = parseFloat(threshold.value);
    thresholdValue.textContent = thresholdVal.toFixed(1);
    
    featuresContainer.innerHTML = '';
    
    Object.entries(correlations).forEach(([feature, correlation]) => {
      const isSelected = Math.abs(correlation) >= thresholdVal;
      const featureDiv = document.createElement('div');
      featureDiv.className = 'feature-checkbox';
      featureDiv.innerHTML = `
        <input type="checkbox" ${isSelected ? 'checked' : ''} disabled>
        <label>${feature.replace('_', ' ')}</label>
        <span class="feature-importance">${correlation.toFixed(2)}</span>
      `;
      featuresContainer.appendChild(featureDiv);
    });
    
    updateCorrelationChart();
  }
  
  function updateCorrelationChart() {
    const ctx = document.getElementById('correlationChart').getContext('2d');
    
    if (charts.correlation) {
      charts.correlation.destroy();
    }
    
    const thresholdVal = parseFloat(threshold.value);
    const labels = Object.keys(correlations);
    const values = Object.values(correlations);
    const colors = values.map(val => Math.abs(val) >= thresholdVal ? '#1FB8CD' : '#ECEBD5');
    
    charts.correlation = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels.map(label => label.replace('_', ' ')),
        datasets: [{
          label: 'Correlation',
          data: values,
          backgroundColor: colors,
          borderColor: colors,
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Feature Correlations (Filter Method)'
          },
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            min: -1,
            max: 1,
            title: {
              display: true,
              text: 'Correlation Coefficient'
            }
          }
        }
      }
    });
  }
  
  threshold.addEventListener('input', updateFilterFeatures);
  updateFilterFeatures();
}

function initializeWrapperMethod() {
  const numFeatures = document.getElementById('numFeatures');
  const numFeaturesValue = document.getElementById('numFeaturesValue');
  const featuresContainer = document.getElementById('rfeFeatures');
  const accuracyElement = document.getElementById('modelAccuracy');
  const timeElement = document.getElementById('trainingTime');
  
  // Simulated feature importance rankings
  const featureRankings = [
    { name: 'area_sqft', importance: 0.89 },
    { name: 'location_score', importance: 0.83 },
    { name: 'bathrooms', importance: 0.72 },
    { name: 'bedrooms', importance: 0.65 },
    { name: 'age_years', importance: 0.45 },
    { name: 'garage', importance: 0.41 },
    { name: 'basement', importance: 0.38 },
    { name: 'garden', importance: 0.23 }
  ];
  
  function updateRFEFeatures() {
    const numFeaturesVal = parseInt(numFeatures.value);
    numFeaturesValue.textContent = numFeaturesVal;
    
    featuresContainer.innerHTML = '';
    
    const selectedFeatures = featureRankings.slice(0, numFeaturesVal);
    
    selectedFeatures.forEach((feature, index) => {
      const featureDiv = document.createElement('div');
      featureDiv.className = 'feature-checkbox';
      featureDiv.innerHTML = `
        <input type="checkbox" checked disabled>
        <label>${feature.name.replace('_', ' ')}</label>
        <span class="feature-importance">Rank ${index + 1}</span>
      `;
      featuresContainer.appendChild(featureDiv);
    });
    
    // Simulate model performance based on number of features
    const accuracy = Math.min(95, 60 + (numFeaturesVal * 6) - (numFeaturesVal > 5 ? (numFeaturesVal - 5) * 2 : 0));
    const time = (numFeaturesVal * 0.1 + 0.2).toFixed(1);
    
    accuracyElement.textContent = `${accuracy}%`;
    timeElement.textContent = `${time}s`;
  }
  
  numFeatures.addEventListener('input', updateRFEFeatures);
  updateRFEFeatures();
}

function initializeEmbeddedMethod() {
  const lassoAlpha = document.getElementById('lassoAlpha');
  const lassoAlphaValue = document.getElementById('lassoAlphaValue');
  const featuresContainer = document.getElementById('lassoFeatures');
  
  // Simulated lasso coefficients
  const baseCoefficients = {
    'bedrooms': 0.65,
    'bathrooms': 0.72,
    'area_sqft': 0.89,
    'age_years': -0.45,
    'location_score': 0.83,
    'garage': 0.41,
    'garden': 0.23,
    'basement': 0.38
  };
  
  function updateLassoFeatures() {
    const alphaVal = parseFloat(lassoAlpha.value);
    lassoAlphaValue.textContent = alphaVal.toFixed(3);
    
    featuresContainer.innerHTML = '';
    
    // Simulate lasso shrinkage
    const shrinkageFactor = 1 - (alphaVal * 5);
    const coefficients = {};
    
    Object.entries(baseCoefficients).forEach(([feature, coeff]) => {
      const shrunkCoeff = coeff * shrinkageFactor;
      coefficients[feature] = Math.abs(shrunkCoeff) > 0.1 ? shrunkCoeff : 0;
    });
    
    Object.entries(coefficients).forEach(([feature, coeff]) => {
      const featureDiv = document.createElement('div');
      featureDiv.className = 'feature-checkbox';
      const isSelected = coeff !== 0;
      featureDiv.innerHTML = `
        <input type="checkbox" ${isSelected ? 'checked' : ''} disabled>
        <label>${feature.replace('_', ' ')}</label>
        <span class="feature-importance">${coeff.toFixed(2)}</span>
      `;
      featuresContainer.appendChild(featureDiv);
    });
    
    updateLassoChart(coefficients);
  }
  
  function updateLassoChart(coefficients) {
    const ctx = document.getElementById('lassoChart').getContext('2d');
    
    if (charts.lasso) {
      charts.lasso.destroy();
    }
    
    const labels = Object.keys(coefficients);
    const values = Object.values(coefficients);
    const colors = values.map(val => val !== 0 ? '#1FB8CD' : '#ECEBD5');
    
    charts.lasso = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels.map(label => label.replace('_', ' ')),
        datasets: [{
          label: 'Lasso Coefficients',
          data: values,
          backgroundColor: colors,
          borderColor: colors,
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Lasso Regularization Coefficients'
          },
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Coefficient Value'
            }
          }
        }
      }
    });
  }
  
  lassoAlpha.addEventListener('input', updateLassoFeatures);
  updateLassoFeatures();
}

// Initialize Feature Extraction section
function initializeFeatureExtraction() {
  initializePCA();
  initializeLDA();
}

function initializePCA() {
  const pcaComponents = document.getElementById('pcaComponents');
  const pcaComponentsValue = document.getElementById('pcaComponentsValue');
  const varianceContainer = document.getElementById('pcaVariance');
  const mappingContainer = document.getElementById('pcaMapping');
  
  // Simulated PCA data
  const explainedVariance = [0.92, 0.07, 0.005, 0.005];
  const featureLoadings = {
    'PC1': { 'sepal_length': 0.36, 'sepal_width': -0.08, 'petal_length': 0.86, 'petal_width': 0.36 },
    'PC2': { 'sepal_length': 0.66, 'sepal_width': 0.73, 'petal_length': -0.18, 'petal_width': -0.07 },
    'PC3': { 'sepal_length': -0.58, 'sepal_width': 0.60, 'petal_length': 0.11, 'petal_width': -0.55 },
    'PC4': { 'sepal_length': 0.32, 'sepal_width': -0.32, 'petal_length': 0.48, 'petal_width': -0.75 }
  };
  
  function updatePCA() {
    const numComponents = parseInt(pcaComponents.value);
    pcaComponentsValue.textContent = numComponents;
    
    // Update variance explanation
    varianceContainer.innerHTML = '';
    let cumulativeVariance = 0;
    
    for (let i = 0; i < numComponents; i++) {
      const variance = explainedVariance[i];
      cumulativeVariance += variance;
      
      const varianceDiv = document.createElement('div');
      varianceDiv.className = 'variance-item';
      varianceDiv.innerHTML = `
        <span>PC${i + 1}</span>
        <span>${(variance * 100).toFixed(1)}%</span>
        <div class="variance-bar" style="width: ${variance * 100}%"></div>
      `;
      varianceContainer.appendChild(varianceDiv);
    }
    
    const totalDiv = document.createElement('div');
    totalDiv.className = 'variance-item';
    totalDiv.style.fontWeight = 'bold';
    totalDiv.innerHTML = `
      <span>Total Explained</span>
      <span>${(cumulativeVariance * 100).toFixed(1)}%</span>
    `;
    varianceContainer.appendChild(totalDiv);
    
    // Update component mappings
    mappingContainer.innerHTML = '';
    
    for (let i = 0; i < numComponents; i++) {
      const pcKey = `PC${i + 1}`;
      const mappingDiv = document.createElement('div');
      mappingDiv.className = 'mapping-item';
      
      const loadings = Object.entries(featureLoadings[pcKey])
        .map(([feature, loading]) => `${feature}: ${loading.toFixed(2)}`)
        .join(', ');
      
      mappingDiv.innerHTML = `
        <strong>${pcKey}</strong><br>
        ${loadings}
      `;
      mappingContainer.appendChild(mappingDiv);
    }
    
    updatePCAChart();
  }
  
  function updatePCAChart() {
    const ctx = document.getElementById('pcaChart').getContext('2d');
    
    if (charts.pca) {
      charts.pca.destroy();
    }
    
    // Create synthetic PCA visualization
    const scatterData = [];
    for (let i = 0; i < 50; i++) {
      scatterData.push({
        x: Math.random() * 4 - 2,
        y: Math.random() * 3 - 1.5,
        species: i < 17 ? 'setosa' : i < 34 ? 'versicolor' : 'virginica'
      });
    }
    
    const species = ['setosa', 'versicolor', 'virginica'];
    const colors = ['#1FB8CD', '#FFC185', '#B4413C'];
    
    charts.pca = new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: species.map((sp, idx) => ({
          label: sp,
          data: scatterData.filter(d => d.species === sp),
          backgroundColor: colors[idx],
          borderColor: colors[idx],
          pointRadius: 6
        }))
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'PCA Visualization (PC1 vs PC2)'
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Principal Component 1'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Principal Component 2'
            }
          }
        }
      }
    });
  }
  
  pcaComponents.addEventListener('input', updatePCA);
  updatePCA();
}

function initializeLDA() {
  const ldaInfo = document.getElementById('ldaInfo');
  
  // Simulated LDA information
  const classInfo = [
    { name: 'setosa', separation: 0.95, count: 17 },
    { name: 'versicolor', separation: 0.82, count: 17 },
    { name: 'virginica', separation: 0.78, count: 16 }
  ];
  
  ldaInfo.innerHTML = '';
  
  classInfo.forEach(info => {
    const classDiv = document.createElement('div');
    classDiv.className = 'class-separation';
    classDiv.innerHTML = `
      <span class="class-name">${info.name}</span><br>
      Separation: ${info.separation.toFixed(2)}<br>
      Samples: ${info.count}
    `;
    ldaInfo.appendChild(classDiv);
  });
  
  createLDAChart();
}

function createLDAChart() {
  const ctx = document.getElementById('ldaChart').getContext('2d');
  
  // Create synthetic LDA visualization
  const ldaData = [];
  for (let i = 0; i < 50; i++) {
    const species = i < 17 ? 'setosa' : i < 34 ? 'versicolor' : 'virginica';
    const baseX = species === 'setosa' ? -2 : species === 'versicolor' ? 0 : 2;
    const baseY = species === 'setosa' ? 1 : species === 'versicolor' ? -1 : 0;
    
    ldaData.push({
      x: baseX + (Math.random() - 0.5) * 0.8,
      y: baseY + (Math.random() - 0.5) * 0.6,
      species: species
    });
  }
  
  const species = ['setosa', 'versicolor', 'virginica'];
  const colors = ['#1FB8CD', '#FFC185', '#B4413C'];
  
  charts.lda = new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: species.map((sp, idx) => ({
        label: sp,
        data: ldaData.filter(d => d.species === sp),
        backgroundColor: colors[idx],
        borderColor: colors[idx],
        pointRadius: 6
      }))
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'LDA Visualization (Discriminant 1 vs Discriminant 2)'
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Linear Discriminant 1'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Linear Discriminant 2'
          }
        }
      }
    }
  });
}

// Initialize Practice section
function initializePractice() {
  const featuresContainer = document.getElementById('practiceFeatures');
  const runButton = document.getElementById('runPrediction');
  const accuracyElement = document.getElementById('practiceAccuracy');
  const featureCountElement = document.getElementById('practiceFeatureCount');
  
  // Create feature checkboxes
  data.housing.features.forEach(feature => {
    const featureDiv = document.createElement('div');
    featureDiv.className = 'feature-checkbox';
    featureDiv.innerHTML = `
      <input type="checkbox" id="practice-${feature}" value="${feature}">
      <label for="practice-${feature}">${feature.replace('_', ' ')}</label>
    `;
    featuresContainer.appendChild(featureDiv);
  });
  
  // Update feature count when checkboxes change
  featuresContainer.addEventListener('change', () => {
    const selectedFeatures = featuresContainer.querySelectorAll('input[type="checkbox"]:checked');
    featureCountElement.textContent = selectedFeatures.length;
  });
  
  // Run prediction simulation
  runButton.addEventListener('click', () => {
    const selectedFeatures = Array.from(featuresContainer.querySelectorAll('input[type="checkbox"]:checked'))
      .map(cb => cb.value);
    
    if (selectedFeatures.length === 0) {
      accuracyElement.textContent = '0%';
      return;
    }
    
    // Simulate model accuracy based on selected features
    const featureWeights = {
      'bedrooms': 0.65,
      'bathrooms': 0.72,
      'area_sqft': 0.89,
      'age_years': 0.45,
      'location_score': 0.83,
      'garage': 0.41,
      'garden': 0.23,
      'basement': 0.38
    };
    
    const totalWeight = selectedFeatures.reduce((sum, feature) => sum + featureWeights[feature], 0);
    const maxWeight = Object.values(featureWeights).reduce((sum, weight) => sum + weight, 0);
    
    const baseAccuracy = 50;
    const accuracy = Math.min(95, baseAccuracy + (totalWeight / maxWeight) * 45);
    
    // Add some penalty for too many features (overfitting simulation)
    const finalAccuracy = selectedFeatures.length > 6 ? accuracy - (selectedFeatures.length - 6) * 3 : accuracy;
    
    accuracyElement.textContent = `${Math.max(0, finalAccuracy).toFixed(1)}%`;
  });
}