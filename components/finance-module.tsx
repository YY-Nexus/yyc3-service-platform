"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, TrendingUp, TrendingDown, CreditCard, Receipt, FileText, Calculator, Clock } from "lucide-react"
import { InvoiceManagement } from "./invoice-management"
import { TaxCalculation } from "./tax-calculation"

export function FinanceModule() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">财务管理中心</h1>
          <p className="text-muted-foreground">全面的财务数据分析与管理</p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            className="bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white border-0"
          >
            <FileText className="w-4 h-4 mr-2" />
            生成报表
          </Button>
          <Button className="bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white">
            <Calculator className="w-4 h-4 mr-2" />
            财务分析
          </Button>
        </div>
      </div>

      {/* 财务概览卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总资产</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥15,847,392</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="w-3 h-3 mr-1" />
              <span>+5.2% 较上季度</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">净利润</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥2,347,156</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="w-3 h-3 mr-1" />
              <span>+12.8% 较上月</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">应收账款</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥1,234,567</div>
            <div className="flex items-center text-xs text-red-600">
              <TrendingDown className="w-3 h-3 mr-1" />
              <span>需关注逾期账款</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">现金流</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥3,456,789</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="w-3 h-3 mr-1" />
              <span>流动性良好</span>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">待开发票</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥856,234</div>
            <div className="flex items-center text-xs text-orange-600">
              <Clock className="w-3 h-3 mr-1" />
              <span>5张发票待处理</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">本月税费</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥304,500</div>
            <div className="flex items-center text-xs text-blue-600">
              <TrendingUp className="w-3 h-3 mr-1" />
              <span>综合税率 30.5%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 财务详细分析 */}
      <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
        <CardHeader>
          <CardTitle>财务分析详情</CardTitle>
          <CardDescription>深入了解企业财务状况</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="profit" className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="profit">盈利分析</TabsTrigger>
              <TabsTrigger value="cashflow">现金流</TabsTrigger>
              <TabsTrigger value="budget">预算管理</TabsTrigger>
              <TabsTrigger value="cost">成本控制</TabsTrigger>
              <TabsTrigger value="invoice">发票管理</TabsTrigger>
              <TabsTrigger value="tax">税务计算</TabsTrigger>
            </TabsList>

            <TabsContent value="profit" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                  <CardHeader>
                    <CardTitle className="text-base">收入构成</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">产品销售</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 h-2 bg-sky-100 rounded-full overflow-hidden">
                            <div className="w-3/4 h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"></div>
                          </div>
                          <span className="text-sm font-medium">75%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">服务收入</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 h-2 bg-sky-100 rounded-full overflow-hidden">
                            <div className="w-1/5 h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full"></div>
                          </div>
                          <span className="text-sm font-medium">20%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">其他收入</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 h-2 bg-sky-100 rounded-full overflow-hidden">
                            <div className="w-1/20 h-full bg-gradient-to-r from-purple-400 to-purple-500 rounded-full"></div>
                          </div>
                          <span className="text-sm font-medium">5%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                  <CardHeader>
                    <CardTitle className="text-base">利润率趋势</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">毛利率</span>
                        <Badge variant="secondary">45.2%</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">净利率</span>
                        <Badge variant="secondary">18.7%</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">ROE</span>
                        <Badge variant="secondary">22.3%</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="cashflow" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">经营活动现金流</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">+¥2,456,789</div>
                    <p className="text-sm text-muted-foreground">本月净流入</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">投资活动现金流</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-600">-¥856,234</div>
                    <p className="text-sm text-muted-foreground">设备投资支出</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">筹资活动现金流</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">+¥500,000</div>
                    <p className="text-sm text-muted-foreground">银行贷款</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="budget" className="space-y-4">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                    <CardHeader>
                      <CardTitle className="text-base">预算执行情况</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">销售预算</span>
                            <span className="text-sm">85%</span>
                          </div>
                          <div className="w-full h-2 bg-sky-100 rounded-full overflow-hidden">
                            <div className="w-[85%] h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">运营预算</span>
                            <span className="text-sm">72%</span>
                          </div>
                          <div className="w-full h-2 bg-sky-100 rounded-full overflow-hidden">
                            <div className="w-[72%] h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full"></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">投资预算</span>
                            <span className="text-sm">45%</span>
                          </div>
                          <div className="w-full h-2 bg-sky-100 rounded-full overflow-hidden">
                            <div className="w-[45%] h-full bg-gradient-to-r from-purple-400 to-purple-500 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                    <CardHeader>
                      <CardTitle className="text-base">预算偏差分析</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">收入偏差</span>
                          <Badge className="bg-green-100 text-green-800">+5.2%</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">成本偏差</span>
                          <Badge className="bg-red-100 text-red-800">+2.8%</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">费用偏差</span>
                          <Badge className="bg-yellow-100 text-yellow-800">-1.5%</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="cost" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                  <CardHeader>
                    <CardTitle className="text-base">成本结构分析</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">原材料成本</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 h-2 bg-sky-100 rounded-full overflow-hidden">
                            <div className="w-2/5 h-full bg-gradient-to-r from-red-400 to-red-500 rounded-full"></div>
                          </div>
                          <span className="text-sm font-medium">40%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">人工成本</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 h-2 bg-sky-100 rounded-full overflow-hidden">
                            <div className="w-3/10 h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full"></div>
                          </div>
                          <span className="text-sm font-medium">30%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">制造费用</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 h-2 bg-sky-100 rounded-full overflow-hidden">
                            <div className="w-1/5 h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full"></div>
                          </div>
                          <span className="text-sm font-medium">20%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">其他费用</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 h-2 bg-sky-100 rounded-full overflow-hidden">
                            <div className="w-1/10 h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full"></div>
                          </div>
                          <span className="text-sm font-medium">10%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                  <CardHeader>
                    <CardTitle className="text-base">成本控制建议</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="p-3 bg-yellow-50 rounded-lg">
                        <p className="text-sm font-medium text-yellow-800">原材料成本上升</p>
                        <p className="text-xs text-yellow-600">建议寻找替代供应商</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <p className="text-sm font-medium text-green-800">人工效率提升</p>
                        <p className="text-xs text-green-600">自动化改造效果显著</p>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm font-medium text-blue-800">能耗成本优化</p>
                        <p className="text-xs text-blue-600">节能设备投资回报良好</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="invoice">
              <InvoiceManagement />
            </TabsContent>

            <TabsContent value="tax">
              <TaxCalculation />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
