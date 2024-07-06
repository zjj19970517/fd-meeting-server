'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">meeting_server documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-78d21810cae03198591d37a6b740525504b82c1ea6caac9876171dd25387f5607acf257b18b2cb101063197e8f4c4f040f0c2349f9b0b77aa34ff8b68cf150ce"' : 'data-bs-target="#xs-controllers-links-module-AppModule-78d21810cae03198591d37a6b740525504b82c1ea6caac9876171dd25387f5607acf257b18b2cb101063197e8f4c4f040f0c2349f9b0b77aa34ff8b68cf150ce"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-78d21810cae03198591d37a6b740525504b82c1ea6caac9876171dd25387f5607acf257b18b2cb101063197e8f4c4f040f0c2349f9b0b77aa34ff8b68cf150ce"' :
                                            'id="xs-controllers-links-module-AppModule-78d21810cae03198591d37a6b740525504b82c1ea6caac9876171dd25387f5607acf257b18b2cb101063197e8f4c4f040f0c2349f9b0b77aa34ff8b68cf150ce"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-78d21810cae03198591d37a6b740525504b82c1ea6caac9876171dd25387f5607acf257b18b2cb101063197e8f4c4f040f0c2349f9b0b77aa34ff8b68cf150ce"' : 'data-bs-target="#xs-injectables-links-module-AppModule-78d21810cae03198591d37a6b740525504b82c1ea6caac9876171dd25387f5607acf257b18b2cb101063197e8f4c4f040f0c2349f9b0b77aa34ff8b68cf150ce"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-78d21810cae03198591d37a6b740525504b82c1ea6caac9876171dd25387f5607acf257b18b2cb101063197e8f4c4f040f0c2349f9b0b77aa34ff8b68cf150ce"' :
                                        'id="xs-injectables-links-module-AppModule-78d21810cae03198591d37a6b740525504b82c1ea6caac9876171dd25387f5607acf257b18b2cb101063197e8f4c4f040f0c2349f9b0b77aa34ff8b68cf150ce"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-SharedModule-aed96c0240c6b05d84f5d24e7551560597776b27517a3a5e6ffe8f594404b39d513995ebe5b159ed94543c7831750b332d2b44ed7673f102dab0d2b0770eb43d"' : 'data-bs-target="#xs-injectables-links-module-SharedModule-aed96c0240c6b05d84f5d24e7551560597776b27517a3a5e6ffe8f594404b39d513995ebe5b159ed94543c7831750b332d2b44ed7673f102dab0d2b0770eb43d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SharedModule-aed96c0240c6b05d84f5d24e7551560597776b27517a3a5e6ffe8f594404b39d513995ebe5b159ed94543c7831750b332d2b44ed7673f102dab0d2b0770eb43d"' :
                                        'id="xs-injectables-links-module-SharedModule-aed96c0240c6b05d84f5d24e7551560597776b27517a3a5e6ffe8f594404b39d513995ebe5b159ed94543c7831750b332d2b44ed7673f102dab0d2b0770eb43d"' }>
                                        <li class="link">
                                            <a href="injectables/EmailHelperService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmailHelperService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JWTHelperService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JWTHelperService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RedisHelperService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RedisHelperService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UserModule-53db864beb8325d405acf32bf93f4ebb30c4ae56248cfc89cb3ece095b73d288deffa42403faf4e22782eae196abfd1ead45b132fd6877b061cf5f9b447ff311"' : 'data-bs-target="#xs-controllers-links-module-UserModule-53db864beb8325d405acf32bf93f4ebb30c4ae56248cfc89cb3ece095b73d288deffa42403faf4e22782eae196abfd1ead45b132fd6877b061cf5f9b447ff311"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-53db864beb8325d405acf32bf93f4ebb30c4ae56248cfc89cb3ece095b73d288deffa42403faf4e22782eae196abfd1ead45b132fd6877b061cf5f9b447ff311"' :
                                            'id="xs-controllers-links-module-UserModule-53db864beb8325d405acf32bf93f4ebb30c4ae56248cfc89cb3ece095b73d288deffa42403faf4e22782eae196abfd1ead45b132fd6877b061cf5f9b447ff311"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UserModule-53db864beb8325d405acf32bf93f4ebb30c4ae56248cfc89cb3ece095b73d288deffa42403faf4e22782eae196abfd1ead45b132fd6877b061cf5f9b447ff311"' : 'data-bs-target="#xs-injectables-links-module-UserModule-53db864beb8325d405acf32bf93f4ebb30c4ae56248cfc89cb3ece095b73d288deffa42403faf4e22782eae196abfd1ead45b132fd6877b061cf5f9b447ff311"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-53db864beb8325d405acf32bf93f4ebb30c4ae56248cfc89cb3ece095b73d288deffa42403faf4e22782eae196abfd1ead45b132fd6877b061cf5f9b447ff311"' :
                                        'id="xs-injectables-links-module-UserModule-53db864beb8325d405acf32bf93f4ebb30c4ae56248cfc89cb3ece095b73d288deffa42403faf4e22782eae196abfd1ead45b132fd6877b061cf5f9b447ff311"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Permission.html" data-type="entity-link" >Permission</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Role.html" data-type="entity-link" >Role</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/HttpExceptionFilter.html" data-type="entity-link" >HttpExceptionFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/HttpResponseEntity.html" data-type="entity-link" >HttpResponseEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginUserVo.html" data-type="entity-link" >LoginUserVo</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterUserDto.html" data-type="entity-link" >RegisterUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePasswordDto.html" data-type="entity-link" >UpdatePasswordDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserLoginDto.html" data-type="entity-link" >UserLoginDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/FormatResponseInterceptor.html" data-type="entity-link" >FormatResponseInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/InvokeRecordInterceptor.html" data-type="entity-link" >InvokeRecordInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TimeoutInterceptor.html" data-type="entity-link" >TimeoutInterceptor</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/LoginGuard.html" data-type="entity-link" >LoginGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/PermissionGuard.html" data-type="entity-link" >PermissionGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/IConfig.html" data-type="entity-link" >IConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/JwtUserData.html" data-type="entity-link" >JwtUserData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Request.html" data-type="entity-link" >Request</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserInfo.html" data-type="entity-link" >UserInfo</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise-inverted.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});