            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Super Admin Dashboard</h2>
          </div>
          {/* Tabs */}
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pb-2">
            <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
              <TabsList className="grid w-full grid-cols-7 h-16 bg-slate-100 p-1 gap-2">
                {tabs.map((tab) => (
                  <TabsTrigger 
                    key={tab.id} 
                    value={tab.id}
                    className="flex flex-col items-center justify-center gap-2 text-xs lg:text-sm font-medium data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700 data-[state=active]:shadow-lg data-[state=active]:scale-110 transition-all px-1 lg:px-3 h-full"
                  >
                    <span className={typeof tab.icon === 'string' ? 'text-2xl' : ''}>
                      {tab.icon}
                    </span>
                    <span className="hidden sm:inline lg:hidden">{tab.shortLabel}</span>
                    <span className="hidden lg:inline">{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </>
      );
    };
    
    export default SuperAdminHeader; 