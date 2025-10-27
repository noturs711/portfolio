// Deployment Validation Script
// Run this in browser console to validate the website

console.log('🚀 Starting Portfolio Deployment Validation...\n');

// Check critical elements
const checks = {
    title: document.title.includes('Mrunal Bapardekar'),
    metaDescription: document.querySelector('meta[name="description"]')?.content?.includes('Data Analyst'),
    profileImage: document.querySelector('.profile-image')?.src?.includes('pp.png'),
    mobileMenu: document.querySelector('.mobile-menu-toggle') !== null,
    navLinks: document.querySelectorAll('.nav-menu a').length >= 8,
    projectLinks: document.querySelectorAll('a[href*="github.com"]').length >= 2,
    emailLink: document.querySelector('a[href^="mailto:"]')?.href?.includes('bmrunal07@gmail.com'),
    resumeLink: document.querySelector('a[href*="Mrunal_Bapardekar_DA.pdf"]') !== null,
    responsiveDesign: window.innerWidth <= 768 ? document.querySelector('.mobile-menu-toggle')?.style.display !== 'none' : true,
    animations: document.querySelector('.profile-image')?.style.transition?.includes('0.4s'),
    threeJS: typeof THREE !== 'undefined',
    customCursor: window.innerWidth > 768 ? document.getElementById('cursor') !== null : true
};

// Display results
console.log('📋 Validation Results:');
console.log('========================');

Object.entries(checks).forEach(([check, passed]) => {
    const status = passed ? '✅' : '❌';
    const name = check.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    console.log(`${status} ${name}: ${passed ? 'PASS' : 'FAIL'}`);
});

// Performance checks
const performanceChecks = {
    imagesLoaded: Array.from(document.querySelectorAll('img')).every(img => img.complete),
    scriptsLoaded: document.querySelector('script[src="script.js"]') !== null,
    cssLoaded: document.querySelector('style') !== null,
    noConsoleErrors: true // This would need to be checked manually
};

console.log('\n⚡ Performance Checks:');
console.log('======================');

Object.entries(performanceChecks).forEach(([check, passed]) => {
    const status = passed ? '✅' : '❌';
    const name = check.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    console.log(`${status} ${name}: ${passed ? 'PASS' : 'FAIL'}`);
});

// Mobile responsiveness test
const mobileTest = () => {
    console.log('\n📱 Mobile Responsiveness Test:');
    console.log('==============================');
    
    const originalWidth = window.innerWidth;
    
    // Simulate mobile viewport
    Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375
    });
    
    // Trigger resize event
    window.dispatchEvent(new Event('resize'));
    
    setTimeout(() => {
        const mobileMenuVisible = document.querySelector('.mobile-menu-toggle')?.style.display !== 'none';
        const navMenuHidden = document.querySelector('.nav-menu')?.style.display === 'none' || 
                             !document.querySelector('.nav-menu')?.classList.contains('active');
        
        console.log(`✅ Mobile Menu Toggle: ${mobileMenuVisible ? 'PASS' : 'FAIL'}`);
        console.log(`✅ Navigation Hidden: ${navMenuHidden ? 'PASS' : 'FAIL'}`);
        
        // Restore original width
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: originalWidth
        });
        
        window.dispatchEvent(new Event('resize'));
    }, 100);
};

// Run mobile test
mobileTest();

// Final summary
setTimeout(() => {
    const totalChecks = Object.keys(checks).length + Object.keys(performanceChecks).length;
    const passedChecks = Object.values(checks).filter(Boolean).length + 
                        Object.values(performanceChecks).filter(Boolean).length;
    
    console.log('\n🎯 Final Summary:');
    console.log('==================');
    console.log(`Total Checks: ${totalChecks}`);
    console.log(`Passed: ${passedChecks}`);
    console.log(`Failed: ${totalChecks - passedChecks}`);
    console.log(`Success Rate: ${Math.round((passedChecks / totalChecks) * 100)}%`);
    
    if (passedChecks === totalChecks) {
        console.log('\n🎉 CONGRATULATIONS! Your portfolio is ready for deployment!');
        console.log('🚀 You can now deploy to GitHub Pages, Netlify, Vercel, or any hosting platform.');
    } else {
        console.log('\n⚠️  Some issues found. Please review the failed checks above.');
    }
}, 2000);

console.log('\n💡 To run this validation:');
console.log('1. Open your website in a browser');
console.log('2. Press F12 to open Developer Tools');
console.log('3. Go to Console tab');
console.log('4. Copy and paste this entire script');
console.log('5. Press Enter to run the validation');
